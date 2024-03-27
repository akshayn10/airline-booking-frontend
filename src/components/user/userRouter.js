import { Route, Routes } from "react-router-dom";
import UserNavbar from "./userNavbar/userNavbar";
import UserTopBar from "./userTopbar/userTopBar";
import UserAccountManagement from "./account/userAccountManagement";

const UserRouter = () => {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <UserNavbar>
            <UserTopBar />
            <Routes>
              <Route path="/dashboard" element={<h1>Dashboard</h1>} />
              <Route path="/account" element={<UserAccountManagement/>} />
              <Route path="/flights" element={<h1>Flight</h1>} />
              <Route path="/reports" element={<h1>Report</h1>} />
            </Routes>
          </UserNavbar>
        }
      />
    </Routes>
  );
};

export default UserRouter;
