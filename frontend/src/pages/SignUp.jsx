import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import accountBG from "../assets/account.jpg";
import axios from "axios";
import { BackToDashBoard } from "../components/BackToDashboard";
import { useNavigate } from "react-router-dom";
import { ErrorWarning } from "../components/ErrorWarning";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const SignUp = () => {
  const [companyName, setCompanyName] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenflag, setHiddenFlag] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [googleAuth, setGoogleAuth] = useState(false);
  const [authProvider, setAuthProvider] = useState("email--authentication");
  const navigate = useNavigate();

  return (
    <div className="flex">
      <div
        className="bg-cover w-1/2 h-screen bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${accountBG})` }}
      >
        <BackToDashBoard />
      </div>
      <div className="w-1/2 ml-auto h-screen flex justify-center">
        {googleAuth ? (
          <div className="flex flex-col justify-center">
            <div className="rounded bg-white w-80 text-center">
              <Heading label={"Signing Up "} />
              <br />
              <br />
              <InputBox
                type={"text"}
                placeholder={"Trustero123"}
                label={"Company Name"}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <Button
                label={"Sign Up"}
                onPress={async () => {
                  try {
                    const response = await axios.post(
                      import.meta.env.VITE_BACKEND_API +
                        "api/v1/company/signup",
                      {
                        username: username,
                        companyName: companyName,
                        password: password,
                        authProvider: authProvider,
                      }
                    );
                    if (response.status == 200) {
                      localStorage.setItem("JWT_TOKEN", response.data.token);
                      navigate("/dashboard", {
                        state: {
                          companyNameURL: response.data.companyNameURL,
                        },
                      });
                    }
                  } catch (err) {
                    if (
                      err.response &&
                      (err.response.status == 422 || err.response.status == 409)
                    ) {
                      setUserName("");
                      setCompanyName("");
                      setPassword("");
                      setHiddenFlag(false);
                      setGoogleAuth(false);
                      setErrorMsg(err.response.data.message);
                    }
                  }
                }}
              />
              <BottomWarning
                label={"Already have an account? "}
                to={"/signin"}
                buttonText={"Sign In"}
              />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <div className="rounded bg-white w-80 text-center">
              <Heading label={"Sign Up "} />
              <Subheading subheading={"Create your account"} />
              <div className="ml-8">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    const credentialResponseDecoded = jwtDecode(
                      credentialResponse.credential
                    );
                    setGoogleAuth(true);
                    setUserName(credentialResponseDecoded.email);
                    setPassword("--oauth--google--oauth--");
                    setAuthProvider("oauth--google--authentication");
                    localStorage.setItem("JWT_TOKEN", response.data.token);
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                />
              </div>
              <div class="inline-flex items-center justify-center w-full mt-6 mb-4">
                <hr class="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
              </div>
              <ErrorWarning label={errorMsg} isHidden={hiddenflag} />
              <InputBox
                type={"text"}
                placeholder={"Trustero123"}
                label={"Company Name"}
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                }}
              />
              <InputBox
                type={"text"}
                placeholder={"Trustero123"}
                label={"Username"}
                value={username}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <InputBox
                type={"password"}
                placeholder={"Trustero123"}
                label={"Password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <Button
                label={"Sign Up"}
                onPress={async () => {
                  try {
                    const response = await axios.post(
                      import.meta.env.VITE_BACKEND_API +
                        "api/v1/company/signup",
                      {
                        username: username,
                        companyName: companyName,
                        password: password,
                        authProvider: authProvider,
                      }
                    );
                    localStorage.setItem("JWT_TOKEN", response.data.token);
                    navigate("/dashboard", {
                      state: {
                        companyNameURL: response.data.companyNameURL,
                      },
                    });
                  } catch (err) {
                    if (
                      err.response &&
                      (err.response.status == 422 || err.response.status == 409)
                    ) {
                      setUserName("");
                      setCompanyName("");
                      setPassword("");
                      setHiddenFlag(false);
                      setErrorMsg(err.response.data.message);
                    }
                  }
                }}
              />
              <BottomWarning
                label={"Already have an account? "}
                to={"/signin"}
                buttonText={"Sign In"}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
