import { Input, Form, Button } from "antd";
import styles from "./forgotPasswordForm.module.css";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SendOutlined } from "@mui/icons-material";

const ForgotPasswordForm = () => {
  const onFinish = (values) => {
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
          <Button type="primary" htmlType="submit" className="login__button">
            Send Email
          </Button>
        </Form.Item>
      </Form>
      <Form.Item>
        <Link to="/auth/login">Back to Login</Link>
      </Form.Item>
    </div>
  );
};
export default ForgotPasswordForm;
