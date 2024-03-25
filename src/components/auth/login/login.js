import LoginForm from "./loginForm/loginForm";
import "./login.css";
import LoginWelcome from "./loginWelcome/LoginWelcome";
import background from '../../../assets/images/airline.jpg';

const Login = () => {
  const styles = {
    width: "100%", // Set width and height as needed
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center", // Adjust as needed (e.g., 'center top')
    backgroundSize: "cover", // Adjust as needed (e.g., 'contain', 'auto')
    backgroundRepeat: "no-repeat", // Adjust as needed
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
