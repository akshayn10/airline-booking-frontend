import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

const { Sider, Content } = Layout;

const AdminDashboardSider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const siderWidthExpanded = 264;
    const siderWidthCollapsed = 80; // Default Ant Design collapsed width

    const [contentMargin, setContentMargin] = useState(siderWidthExpanded);
    const location = useLocation();

    useEffect(() => {
        // Update contentMargin based on collapsed state
        setContentMargin(collapsed ? siderWidthCollapsed : siderWidthExpanded);
    }, [collapsed, siderWidthCollapsed, siderWidthExpanded]);

    // Determine the selectedKeys based on the current path
    const selectedKeys = [location.pathname.startsWith("/admin/flight-management") ? "1"
        : location.pathname.startsWith("/admin/flight-location-management") ? "2" 
        : location.pathname.startsWith("/admin/admin-report") ? "3": ""];

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg" onBreakpoint={broken => {
                setCollapsed(broken);
            }} width={'fit-content'} style={{ minHeight: '100vh', position: 'fixed', padding: 16 }}>
                <Menu theme="dark" selectedKeys={selectedKeys}>
                    <Menu.Item key="1" icon={<FlightIcon />}>
                        <Link to="flight-management">Flight Management</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ConnectingAirportsIcon />}>
                        <Link to="flight-location-management">Flight Location Management</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ConnectingAirportsIcon />}>
                        <Link to="admin-report">Reports</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: `${contentMargin}px` }}>
                <Content
                    style={{
                        padding: 32,
                        minHeight: '100vh',
                    }}
                >
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminDashboardSider;
