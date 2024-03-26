import styles from "./userTopBar.module.css";
import { Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
const UserTopBar = () => {
    const logout = () => {
        window.alert("Logout")
    }
  const items = [
    {
      key: "1",
      label: <Link to="account">User Account</Link>,
    },
    {
      key: "2",
      label: <Button onClick={logout} danger type="primary" style={{color:"white"}}  to="logout">Logout</Button>,
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
