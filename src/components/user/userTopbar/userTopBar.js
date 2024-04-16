import styles from "./userTopBar.module.css";
import { Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { logout } from "../../../util/AuthUtils";

const UserTopBar = () => {
  const handleLogout = () => {
    logout();
  };
  const items = [
    {
      key: "1",
      label: <Link to="/user/account">User Account</Link>,
    },
    {
      key: "2",
      label: <Link to="/auth/change-password">Change Password</Link>,
    },
    {
      key: "3",
      label: (
        <Button
          onClick={handleLogout}
          danger
          type="primary"
          style={{ color: "white" }}
        >
          Logout
        </Button>
      ),
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.avatar}>
        <Dropdown
          menu={{
            items,
          }}
          placement="bottomRight"
          arrow
        >
          <Avatar size={40} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </div>
  );
};
export default UserTopBar;
