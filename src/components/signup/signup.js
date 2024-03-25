import SignupForm from "./signupForm/signupForm/signupForm";
import SignupWelcome from "./signupForm/signupWelcome/signupWelcome";
import "./signup.css";
import background from "../../assets/images/flightbg.jpg";

const Signup = () => {
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
      <div className="signup__text">User Signup</div>
      <div className="signup__container">
        <div className="signup__welcome">
          <SignupWelcome />
        </div>
        <div className="signup__form">
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
