import styles from "./resetPassword.module.css";
import ResetPasswordForm from "./resetPasswordForm/resetPasswordForm";
import resetPassword from "../../../../assets/images/resetPassword.jpg";
import background from "../../../../assets/images/background.jpg";

const ResetPassword = () => {
  const bgStyle = {
    width: "100%",
    height: "100vh",
    backgroundImage: `url(${background})`,
    backgroundPosition: "center", 
    backgroundSize: "cover", 
    backgroundRepeat: "no-repeat", 
  };
  return (
    <div className={styles.container} style={bgStyle}>
      <div className={styles.resetPassword__container}>
        <div className={styles.resetPassword__intro}>
          <h1 style={{ marginTop: "10%" }}>Reset Password</h1>
          <img src={resetPassword} alt="resetPassword" />
        </div>
        <ResetPasswordForm className={styles.resetPassword__form} />
      </div>
    </div>
  );
};

export default ResetPassword;
