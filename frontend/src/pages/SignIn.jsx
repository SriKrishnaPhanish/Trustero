import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { Subheading } from "../components/Subheading";
import axios from "axios";
import accountBG from "../assets/account.jpg";
import { BackToDashBoard } from "../components/BackToDashboard";
import { useNavigate } from "react-router-dom";
import { ErrorWarning } from "../components/ErrorWarning";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

export const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [hiddenflag, setHiddenFlag] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const fetchCompanyConfirm = async (usernameEmail) => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_API + "api/v1/company/signin/google",
        {
          username: usernameEmail,
        }
      );
      return response;
    } catch (err) {
      return err.response;
    }
  };
  return (
    <div className="flex">
      <div
        className="bg-cover w-1/2 h-screen bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${accountBG})` }}
      >
        <BackToDashBoard />
      </div>
      <div className="w-1/2 ml-auto h-screen flex justify-center">
        <div className="flex flex-col justify-center">
          <div className="rounded bg-white w-80 text-center">
            <Heading label={"Sign In "} />
            <Subheading
              subheading={"Enter your credentials to access your account"}
            />
            <ErrorWarning label={errorMsg} isHidden={hiddenflag} />
            <div className="ml-8">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  const credentialResponseDecoded = await jwtDecode(
                    credentialResponse.credential
                  );
                  const usernameEmail = credentialResponseDecoded.email;
                  fetchCompanyConfirm(usernameEmail).then((response) => {
                    if (response.status == 200) {
                      localStorage.setItem("JWT_TOKEN", response.data.token);
                      navigate("/dashboard", {
                        state: {
                          companyNameURL: response.data.companyNameURL,
                        },
                      });
                    } else if (response && response.status == 404) {
                      setErrorMsg(response.data.message);
                      setUserName("");
                      setHiddenFlag(false);
                    }
                  });
                }}
                onError={() => {
                  setErrorMsg(err.response.data.message);
                  console.log("Login Failed");
                }}
              />
            </div>
            <div class="inline-flex items-center justify-center w-full mt-6 mb-4">
              <hr class="w-64 h-px bg-gray-200 border-0 dark:bg-gray-700" />
            </div>
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
              label={"Sign In"}
              onPress={async () => {
                try {
                  const response = await axios.post(
                    import.meta.env.VITE_BACKEND_API + "api/v1/company/signin",
                    {
                      username: username,
                      password: password,
                    }
                  );
                  localStorage.setItem("JWT_TOKEN", response.data.token);
                  console.log(response);
                  navigate("/dashboard", {
                    state: {
                      companyNameURL: response.data.companyNameURL,
                    },
                  });
                } catch (err) {
                  if (
                    err.response &&
                    (err.response.status == 422 || err.response.status == 404)
                  ) {
                    setUserName("");
                  }
                  setPassword("");
                  setHiddenFlag(false);
                  setErrorMsg(err.response.data.message);
                }
              }}
            />
            <BottomWarning
              label={"Don't have an account ? "}
              to={"/signup"}
              buttonText={"Sign Up"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
