import { useEffect, useState } from "react";
import styles from "./confirmEmail.module.css";
import OTP from "./otp";
import { useDispatch, useSelector } from "react-redux";
import { useNotificationContext } from "../../../../context/notificationContext";
import { ConfirmEmailWithOTP } from "../../../../redux/actions/AuthActions";
const ConfirmEmail = ({ next, email }) => {
  const { openNotification } = useNotificationContext();
  const confirmEmailResponse = useSelector(
    (state) => state.confirmEmailResponseReducer
  );
  const dispatch = useDispatch();
  const handleOtpSubmit = (otp) => {
    const otpData = {
      email: email,
      otp: otp,
    };
    console.log(otpData);
    dispatch(ConfirmEmailWithOTP(otpData));
  };
  const handleResendOtp = () => {
  };
  useEffect(() => {
    if (confirmEmailResponse.status === true) {
      openNotification("success", confirmEmailResponse.data);
      next();
    } else if (confirmEmailResponse.status === false) {
      openNotification("error", confirmEmailResponse.message);
    }
  }, [confirmEmailResponse]);

  return (
    <div className={styles.confirm_email_container}>
      <h1>Confirm Your Email</h1>
      <p>
        A verification code has been sent to your email. Please enter the code
        to verify and continue using our services.
      </p>
      <div className={styles.actions}>

        <OTP handleOtpSubmit={handleOtpSubmit} />
        {/* <button onClick={handleResendOtp} className={styles.resend__button}>
          Resend Confirmation Code
        </button> */}
      </div>
    </div>
  );
};

export default ConfirmEmail;
