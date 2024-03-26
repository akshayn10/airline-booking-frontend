import { Route, Routes } from "react-router-dom";
import UserNavbar from "./userNavbar/userNavbar";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserNavbar />} />
    </Routes>
  );
};

export default UserRouter;
