import styles from "./userTopBar.module.css";
import { Button, Dropdown } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { clearLocalStorage } from "../../../util/localStorageUtils";
import { useDispatch} from "react-redux";
import { ResetAuthentication } from "../../../redux/actions/AuthActions";


const UserTopBar = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        clearLocalStorage();
        dispatch(ResetAuthentication());
        navigate("/auth/login");
    }
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
