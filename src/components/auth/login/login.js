import LoginForm from "./loginForm/loginForm";
import "./login.css";
import LoginWelcome from "./loginWelcome/LoginWelcome";
import background from '../../../assets/images/airline.jpg';

const Login = () => {
  const styles = {
    width: "100%", 
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center", 
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat", 
  };
  return (
    <div style={styles}>
      <div className="userLogin__text">
         User Login
        </div>
      <div className="login__container">
        <div className="login__form">
          <LoginForm />
        </div>
        <div className="login__welcome">
          <LoginWelcome />
        </div>
      </div>
    </div>
  );
};

export default Login;
