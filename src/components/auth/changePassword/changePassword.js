import styles from './changePassword.module.css'
import background from "../../../assets/images/background.jpg";
import changePassword from "../../../assets/images/changePassword.svg";
import ChangePasswordForm from './changePasswordForm/changePasswordForm';
const ChangePassword = () => {
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
          <div className={styles.changePassword__container}>
            <div className={styles.changePassword__intro}>
              <h1 style={{ marginTop: "10%" }}>Change Password</h1>
              <img src={changePassword} alt="changePassword" />
            </div>
            <ChangePasswordForm className={styles.changePassword__form} />
          </div>
        </div>
      );
}
export default ChangePassword