import React, { useState } from "react";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FlightIcon from "@mui/icons-material/Flight";
import { Button, Menu } from "antd";
import { useNavigate } from 'react-router-dom';
const getItem =(label, key, icon, children, type)=> {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("Dashboard", "1", <PieChartOutlined />),
  // getItem("Flights", "2", <FlightIcon />),
  // getItem("Reports", "3", <AssessmentIcon />),
];
const UserNavbar = ({ children }) => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  const handleClick = (e) => {  
    switch (e.key) {
      case '1':
        navigate('/user/dashboard');
        break;
      case '2':
        navigate('/user/flights');
        break;
      case '3':
        navigate('/user/reports');
        break;
      default:
        console.log('default');
    }

  }
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
      }}
    >
      <div style={{ width: !collapsed ? 256 : 100, color: "#001529" }}>
        <Button
          style={{
            zIndex: 2,
            position: "absolute",
            top: "5%",
            left: collapsed ? "2.5%" : "10.5%",
          }}
          danger
          type="primary"
          onClick={toggleCollapsed}
        >
          {collapsed ? <RightCircleOutlined /> : <LeftCircleOutlined />}
        </Button>
        <div style={{ height: "100%" }}>
          <Menu
            style={{
              width: collapsed ? "4%" : "12%",
              position: "absolute",
              height: "100%",
              paddingTop: "6%",
            }}
            defaultSelectedKeys={["1"]}
            mode="inline"
            theme="dark"
            inlineCollapsed={collapsed}
            items={items}
            onClick={handleClick}
          ></Menu>
        </div>
      </div>
      <div
        style={{ width: collapsed ? "96%" : "88%", backgroundColor: "azure" }}
      >
        {children}
      </div>
    </div>
  );
};
export default UserNavbar;
