import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';

const { Sider, Content } = Layout;

const AdminDashboardSider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    const siderWidthExpanded = 264;
    const siderWidthCollapsed = 80; // Default Ant Design collapsed width

    const [contentMargin, setContentMargin] = useState(siderWidthExpanded);

    useEffect(() => {
        // Update contentMargin based on collapsed state
        setContentMargin(collapsed ? siderWidthCollapsed : siderWidthExpanded);
    }, [collapsed, siderWidthCollapsed, siderWidthExpanded]);

    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed} breakpoint="lg" onBreakpoint={broken => {
                setCollapsed(broken)
            }} width={'fit-content'} style={{ minHeight: '100vh', position: 'fixed', padding: 16 }}>
                <Menu theme="dark" defaultSelectedKeys={['1']}>
                    <Menu.Item key="1" icon={<FlightIcon />}>
                        <Link to="admin/flight-management">Flight Management</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<ConnectingAirportsIcon />}>
                        <Link to="admin/flight-location-management">Flight Location Management</Link>
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
