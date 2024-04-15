import "./loginWelcome.css";
import { useNavigate } from "react-router-dom";
const LoginWelcome = () => {
  const navigate = useNavigate();
  const onclickHandler = () => {
    navigate("/auth/signup")
  }
  return (
    <div className="loginWelcome__container">
      <h1>Welcome to Air Arabia</h1>
      <button onClick={onclickHandler} className="sign_up__btn">Sign Up</button>
    </div>
  );
};

export default LoginWelcome;
