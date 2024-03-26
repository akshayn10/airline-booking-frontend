import { Route, Routes } from "react-router-dom";
import Login from "./login/login.js";
import Signup from "./signup/signup.js";
import Contact from "./signup/contact/contact.js";

const AuthRouter = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route
        path="signup/*"
        element={
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        }
      />
    </Routes>
  );
};

export default AuthRouter;
