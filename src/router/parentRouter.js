import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "../components/admin/AdminRouter";
import AuthRouter from "../components/auth/AuthRouter";
import UserRouter from "../components/user/userRouter";
import BookingRouter from "../components/booking/BookingRouter";

const ParentRouter = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/user/*" element={<UserRouter />} />
      <Route path = "/booking/*" element={<BookingRouter/>}/>
    </Routes>
  );
};
export default ParentRouter;
