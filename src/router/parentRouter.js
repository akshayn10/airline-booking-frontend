import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminRouter from "../components/admin/AdminRouter";
import AuthRouter from "../components/auth/AuthRouter";
import UserRouter from "../components/user/userRouter";
import SearchRouter from "../components/search/SearchRouter";
import FlightSearchSimple from "../components/search/FlightSearchSimple";

const ParentRouter = () => {
  return (
    <Routes>
      <Route path="/admin/*" element={<AdminRouter />} />
      <Route path="/auth/*" element={<AuthRouter />} />
      <Route path="/user/*" element={<UserRouter />} />
      <Route path="/" element={<FlightSearchSimple />} />{" "}
      {/* Render FlightSearchSimple on empty path */}
      <Route path="/search/*" element={<SearchRouter />} />{" "}
      {/* Nested routing for search section */}
    </Routes>
  );
};
export default ParentRouter;
