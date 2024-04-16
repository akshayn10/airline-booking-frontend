import { Input, Form, Button } from "antd";
import styles from "./changePasswordForm.module.css";
import { LockOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { ChangePassword } from "../../../../redux/actions/AuthActions";
import { useNotificationContext } from "../../../../context/notificationContext";
import { useEffect } from "react";
const ChangePasswordForm = () => {
  const dispatch = useDispatch();
  const email = localStorage.getItem("email");
  const changePasswordResponse = useSelector(
    (state) => state.changePasswordResponseReducer
  );
  const { openNotification } = useNotificationContext();
  const navigate = useNavigate();
  const onFinish = (values) => {
    values = { ...values, email: email };
    dispatch(ChangePassword(values));
    console.log("Success:", values);
  };

  useEffect(() => {
    if (changePasswordResponse.status === true) {
      openNotification("success", changePasswordResponse.data);
      navigate("/auth/login");
    } else if (changePasswordResponse.status === false) {
      openNotification("error", changePasswordResponse.message);
    }
  }, [changePasswordResponse]);
  return (
    <div className={styles.container}>
      <Form onFinish={onFinish}>
        <Form.Item
          name="oldPassword"
          rules={[
            {
              required: true,
              message: "Please input Current Password!",
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
            placeholder="Current Password"
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
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
                if (!value || getFieldValue("newPassword") === value) {
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
            Change Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default ChangePasswordForm;
