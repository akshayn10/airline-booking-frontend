import { Input, Form, Button } from "antd";
import styles from "./forgotPasswordForm.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OTP from "../../../signup/confirmEmail/otp";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { ForgotPassword, ForgotPasswordConfirmation } from "../../../../../redux/actions/AuthActions";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [disableEmailSubmitButton, setDisableEmailSubmitButton] =
    useState(false);
  const handleOtpSubmit = () => {
    const otpData = {
      email: email,
      otp: otp
    }
    dispatch(ForgotPasswordConfirmation(otpData))
    const routeState = { email: email };
    // navigate("/auth/reset-password", { state: routeState });

  };
  const onFinish = (values) => {
    setEmail(values.email);
    dispatch(ForgotPassword(values))
    setShowOtp(true);
    setDisableEmailSubmitButton(true);
    console.log("Success:", values);
  };
  return (
    <div className={styles.container}>
      <Form onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
            {
              type: "email",
              message: "The email address is invalid!",
            },
          ]}
          hasFeedback
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item>
          <Button disabled={disableEmailSubmitButton} type="primary" htmlType="submit" className="login__button">
            Send Email
          </Button>
        </Form.Item>
      </Form>
      {showOtp && <OTP handleOtpSubmit={handleOtpSubmit} setOtp={setOtp} />}

      <Link to="/auth/login">Back to Login</Link>
    </div>
  );
};
export default ForgotPasswordForm;
