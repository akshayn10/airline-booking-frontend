import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "../components/admin/AdminRouter";
import AuthRouter from "../components/auth/AuthRouter";
import UserRouter from "../components/user/userRouter";

const ParentRouter = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/user/*" element={<UserRouter />} />
    </Routes>
  );
};
export default ParentRouter;
