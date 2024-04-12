import React, { useEffect } from "react";
import { notification, Space } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./loginForm.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  LoginUser,
  ResetLoginResponseState,
} from "../../../../redux/actions/AuthActions";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginResponse = useSelector((state) => ({
    status: state.loginResponseReducer.status,
    message: state.loginResponseReducer.message,
    data: state.loginResponseReducer.data,
  }));
  useEffect(() => {
    dispatch(ResetLoginResponseState());
    console.log("loginResponse", loginResponse);
  }, []);

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, message,description) => {
    api[type]({
      message: message,
      description:description
    });
  };
  useEffect(() => {
    console.log("loginResponse", loginResponse);
    if (loginResponse.status === true) {
      openNotificationWithIcon("success", "Login Success");
    } else if (loginResponse.status === false) {
      openNotificationWithIcon("error", loginResponse.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginResponse]);

  const onFinish = (values) => {
    dispatch(LoginUser(values));
    console.log("Received values of form: ", values);
  };
  return (
    <div className="loginForm__container">
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
            {
              min: 8,
              message: "Password must be at least 8 characters long!",
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
        <Form.Item>
          <Link to="/auth/forgot-password">Forgot password</Link>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login__button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      <>{contextHolder}</>
    </div>
  );
};
export default LoginForm;
