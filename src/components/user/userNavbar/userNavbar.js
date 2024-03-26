import React, { useState } from "react";
import {
  RightCircleOutlined,
  LeftCircleOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import AssessmentIcon from "@mui/icons-material/Assessment";
import FlightIcon from "@mui/icons-material/Flight";
import { Button, Menu } from "antd";
function getItem(label, key, icon, children, type) {
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
  getItem("Flights", "2", <FlightIcon />),
  getItem("Reports", "3", <AssessmentIcon />),
];
const UserNavbar = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
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
            top: "1%",
            left: collapsed ? "3%" : "11%",
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
            onClick={(e) => console.log(e)}
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
