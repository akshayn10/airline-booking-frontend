import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu, Alert } from "antd";
import FlightIcon from "@mui/icons-material/Flight";
import ConnectingAirportsIcon from "@mui/icons-material/ConnectingAirports";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const { Sider, Content } = Layout;

const AdminDashboardSider = ({ children }) => {
  const location = useLocation();

  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setShowAlert(window.innerWidth < 1920);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Determine the selectedKeys based on the current path
  const selectedKeys = [
    location.pathname.startsWith("/admin/flight-management")
      ? "1"
      : location.pathname.startsWith("/admin/flight-location-management")
      ? "2"
      : "",
  ];

  return (
    <Layout>
      {showAlert && (
        <Alert
          message="Warning"
          description="Your screen width is too small for a perfect informaiton display. Please enlarge your window for the best experience."
          type="warning"
          showIcon
          closable={false}
          style={{
            zIndex: 2,
            position: "fixed",
            minHeight: "100vh",
            width: "100%",
          }}
        />
      )}
      <Sider
        width={"fit-content"}
        style={{
          minHeight: "100vh",
          position: "fixed",
          padding: 16,
          zIndex: 1,
        }}
      >
        <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
          <Menu.Item key="1" icon={<FlightIcon />}>
            <Link to="flight-management">Flight Management</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<ConnectingAirportsIcon />}>
            <Link to="flight-location-management">
              Flight Location Management
            </Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<ConnectingAirportsIcon />}>
            <Link to="fleet-management">Fleet Management</Link>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<ExitToAppIcon />}
            style={{ position: "absolute", bottom: 0 }}
          >
            <Link to="">Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 272 }}>
        <Content style={{ padding: 32, minHeight: "100vh" }}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboardSider;
