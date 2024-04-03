import styles from "./confirmEmail.module.css";
import email from '../../../../assets/images/email.svg'
const ConfirmEmail = ({next}) => {
  return (
    <div className={styles.confirm_email_container}>
        <img src={email} alt="email" />
      <h1>Confirm Your Email</h1>
      <p>
        A confirmation email has been sent to your inbox. Please click the link
        in the email to verify your account and continue using our services.
      </p>
      <div className={styles.actions}>
        <button className={styles.resend__button}>Resend Confirmation Email</button>
        <div></div>
        <button className={styles.continue__button} onClick={next}>Continue</button>
      </div>
    </div>
  );
};

export default ConfirmEmail;
