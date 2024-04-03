import { Route, Routes } from "react-router-dom";
import Login from "./login/login.js";
import Signup from "./signup/signup.js";
import ForgotPassword from "./login/forgotPassword/forgotPassword.js";
import ResetPassword from "./login/resetPassword/resetPassword.js";
import ChangePassword from "./changePassword/changePassword.js";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
      <Route path="change-password" element={<ChangePassword />} />
      <Route path="signup" element={<Signup />} />
    </Routes>
  );
};

export default AuthRouter;
