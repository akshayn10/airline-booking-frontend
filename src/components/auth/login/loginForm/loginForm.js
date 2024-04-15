import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./loginForm.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  LoginUser,
  ResetLoginResponseState,
} from "../../../../redux/actions/AuthActions";
import { useNotificationContext } from "../../../../context/notificationContext";

const LoginForm = () => {
  const {openNotification} = useNotificationContext();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginResponse = useSelector((state) => state.loginResponseReducer); 
  const authRole = useSelector((state) => state.authenticationStateReducer.role
  );
  useEffect(() => {
    dispatch(ResetLoginResponseState());
  }, []);

  
  useEffect(() => {
    if (loginResponse.status === true) {
      openNotification("success", "Login Success");
      setTimeout(() => {
      if (authRole) {
        if (authRole === "ADMIN") {
          navigate("/admin");
        }
        if (authRole === "USER") {
          navigate("/user/dashboard");
        }
      }
      },1000)

    } else if (loginResponse.status === false) {
      openNotification("error", loginResponse.message);
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
    </div>
  );
};
export default LoginForm;
