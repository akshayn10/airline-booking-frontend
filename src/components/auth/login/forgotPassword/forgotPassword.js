import styles from "./forgotPassword.module.css";
import ForgotPasswordForm from "./forgotPasswordForm/forgotPasswordForm";
import forgotPassword from "../../../../assets/images/forgotPassword.svg";
import background from "../../../../assets/images/background.jpg";

const ForgotPassword = () => {
  const bgStyle = {
    width: "100%", // Set width and height as needed
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center", // Adjust as needed (e.g., 'center top')
    backgroundSize: "cover", // Adjust as needed (e.g., 'contain', 'auto')
    backgroundRepeat: "no-repeat", // Adjust as needed
  };
  return (
    <div className={styles.container} style={bgStyle}>
      <div className={styles.forgotPassword__container}>
        <div className={styles.forgotPassword__intro}>
          <h1 style={{ marginTop: "10%" }}>Forgot Password</h1>
          <img src={forgotPassword} alt="forgotPassword" />
        </div>

        <ForgotPasswordForm className={styles.forgotPassword__form} />
      </div>
    </div>
  );
};

export default ForgotPassword;
