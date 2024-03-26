import { Route, Routes } from "react-router-dom";
import UserNavbar from "./userNavbar/userNavbar";
import UserTopBar from "./userTopbar/userTopBar";

const UserRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<UserNavbar >
        <UserTopBar/>
      </UserNavbar>} />
    </Routes>
  );
};

export default UserRouter;
