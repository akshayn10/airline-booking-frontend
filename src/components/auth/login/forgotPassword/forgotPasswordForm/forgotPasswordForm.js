import { Input, Form, Button } from "antd";
import styles from "./forgotPasswordForm.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import OTP from "../../../signup/confirmEmail/otp";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import {
  ForgotPassword,
  ForgotPasswordConfirmation,
} from "../../../../../redux/actions/AuthActions";
import { useNotificationContext } from "../../../../../context/notificationContext";

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const forgotPasswordResponse = useSelector(
    (state) => state.forgotPasswordResponseReducer
  );
  const forgotPasswordConfirmationResponse = useSelector(
    (state) => state.forgotPasswordConfirmationResponseReducer
  );
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [disableEmailSubmitButton, setDisableEmailSubmitButton] =
    useState(false);
  const handleOtpSubmit = (otp) => {
    const otpData = {
      email: email,
      otp: otp,
    };
    dispatch(ForgotPasswordConfirmation(otpData));
  };
  useEffect(() => {
    if (forgotPasswordResponse.status === true) {
      openNotification("success", forgotPasswordResponse.data);
      setShowOtp(true);
      setDisableEmailSubmitButton(true);
    } else if (forgotPasswordResponse.status === false) {
      openNotification("error", forgotPasswordResponse.message);
    }
  }, [forgotPasswordResponse]);
  useEffect(() => {
    if (forgotPasswordConfirmationResponse.status === true) {
      openNotification("success", forgotPasswordConfirmationResponse.data);
      const routeState = { email: email };
      navigate("/auth/reset-password", { state: routeState });
    } else if (forgotPasswordConfirmationResponse.status === false) {
      openNotification("error", forgotPasswordConfirmationResponse.message);
    }
  }, [forgotPasswordConfirmationResponse]);
  const onFinish = (values) => {
    setEmail(values.email);
    dispatch(ForgotPassword(values));

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
          <Button
            disabled={disableEmailSubmitButton}
            type="primary"
            htmlType="submit"
            className="login__button"
          >
            Send Email
          </Button>
        </Form.Item>
      </Form>
      {showOtp && <OTP handleOtpSubmit={handleOtpSubmit}/>}

      <Link to="/auth/login">Back to Login</Link>
    </div>
  );
};
export default ForgotPasswordForm;
