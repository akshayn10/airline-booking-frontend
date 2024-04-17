import "./signupWelcome.css";
import background from "../../../../../assets/images/wings.jpg";

const SignupWelcome = () => {
  const styles = {
    width: "100%", // Set width and height as needed
    backgroundImage: `url(${background})`,
    backgroundPosition: "center", // Adjust as needed (e.g., 'center top')
    backgroundSize: "cover", // Adjust as needed (e.g., 'contain', 'auto')
    backgroundRepeat: "no-repeat", // Adjust as needed
  };
  return (
    <div style={styles} className="signupWelcome__container">
      <h1>Welcome to King Flyer</h1>
    </div>
  );
};

export default SignupWelcome;
