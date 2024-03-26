import { Route, Routes } from "react-router-dom";
import Login from "./login/login.js";
import Signup from "./signup/signup.js";
import ForgotPassword from "./login/forgotPassword/forgotPassword.js";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default AuthRouter;
