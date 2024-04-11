import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import "./signupForm.css";
import { useDispatch } from "react-redux";
import { RegisterUser } from "../../../../../redux/actions/AuthActions";

const SignupForm = ({ next,setEmail }) => {
  const dispatch = useDispatch();
  const onFinish = (values) => {
    // dispatch(RegisterUser(values));
    setEmail(values.email);
    console.log("Received values of form: ", values);
    next();
  };

  return (
    <div className="signupForm__container">
      <Form onFinish={onFinish}>
        <div
          style={{
            display: "flex",
            gap: "1%",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <Form.Item
            name="firstName"
            rules={[
              {
                required: true,
                message: "Please input your First Name!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[
              {
                required: true,
                message: "Please input your Last Name!",
              },
            ]}
            hasFeedback
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
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
          name="username"
          rules={[
            {
              required: true,
              message: "Please input a Username!",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="Username" />
        </Form.Item>
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
          <Button
            shape="round"
            type="primary"
            htmlType="submit"
            className="signup__button"
          >
            GET STARTED
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default SignupForm;
