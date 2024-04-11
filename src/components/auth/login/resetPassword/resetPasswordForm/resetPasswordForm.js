import { Input, Form, Button } from "antd";
import styles from "./resetPasswordForm.module.css";
import { LockOutlined } from "@mui/icons-material";
import { useLocation } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { ResetPassword } from "../../../../../redux/actions/AuthActions";
const ResetPasswordForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const email = location.state.email;
  const onFinish = (values) => {
    values = { ...values, email: email };
    dispatch(ResetPassword(values))
    console.log("Success:", values);
  };
  return (
    <div className={styles.container}>
      {email}
      <Form onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              pattern: "^(?=.*\\d).{8,}$",
              message:
                "Password must be at least 8 characters long and contain at least one number",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: "Please Confirm your Password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
          hasFeedback
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login__button">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ResetPasswordForm;
