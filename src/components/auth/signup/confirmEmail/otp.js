import { Form } from "antd";
import { InputOTP } from "antd-input-otp"; // Don't forget to import this too!
import styles from "./confirmEmail.module.css";
const OTP = ({ handleOtpSubmit }) => {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const otpString = values.otp.join("");
    console.log(otpString);
    // setTimeout(() => {
      handleOtpSubmit(otpString);
    // },500)
  };
  return (
    <Form onFinish={onFinish}>
      <Form.Item label="OTP" name="otp">
        <InputOTP inputType="numeric" />
      </Form.Item>

      <Form.Item>
        <button className={styles.continue__button} type="submit">
          Submit OTP
        </button>
      </Form.Item>
    </Form>
  );
};
export default OTP;
