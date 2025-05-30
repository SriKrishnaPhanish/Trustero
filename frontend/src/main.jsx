import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="273613367877-54ubignco8igek1efvrbod3jvu0mvhim.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
