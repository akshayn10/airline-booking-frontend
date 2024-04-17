import { useState, useEffect } from 'react';
import { Link, useLocation} from 'react-router-dom';
import { Layout, Menu, Alert, notification } from 'antd';
import FlightIcon from '@mui/icons-material/Flight';
import ConnectingAirportsIcon from '@mui/icons-material/ConnectingAirports';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useSelector, useDispatch } from 'react-redux';
import { ResetAPIResponse } from '../../redux/actions/AdminActions';
import { logout } from '../../util/AuthUtils';
const { Sider, Content } = Layout;

const AdminDashboardSider = ({ children }) => {
    const location = useLocation();
    const dispatch = useDispatch();

    const handleLogout = () => {
        logout()
    }

    const apiResponseType = useSelector((state) => state.apiErrorReducer.responseType);
    const apiResponseMessage = useSelector((state) => state.apiErrorReducer.responseMessage);

    const [showAlert, setShowAlert] = useState(false);

    const selectedKeys = [location.pathname.startsWith("/admin/flight-management") ? "1"
        : location.pathname.startsWith("/admin/flight-location-management") ? "2"
            : location.pathname.startsWith("/admin/admin-report") ? "3" : ""];

    useEffect(() => {
        const handleResize = () => {
            setShowAlert(window.innerWidth < 1024 || window.innerHeight < 640);
        }

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (apiResponseType && apiResponseMessage) {
            notification.open({
                type: apiResponseType,
                message: apiResponseMessage,
                placement: 'bottomRight',
            });
        }

        dispatch(ResetAPIResponse());
    }, [apiResponseType, apiResponseMessage, selectedKeys]);

    return (
        <Layout>
            {showAlert && (
                <Alert
                    message="Screen Size Warning"
                    description="Your screen is too small for a perfect information display. Please enlarge your window for the best experience."
                    type="warning"
                    showIcon
                    closable={false}
                    style={{ zIndex: 2, position: 'fixed', minHeight: '100vh', width: '100%' }}
                />
            )}
            <Sider width={'fit-content'} style={{ minHeight: '100vh', position: 'fixed', padding: 16, zIndex: 1 }}>
                <Menu theme="dark" selectedKeys={selectedKeys} mode="inline">
                    <Menu.Item key="1" icon={<FlightIcon />}>
                        <Link to="flight-management">Flight Management</Link>
                    </Menu.Item>
                    <Menu.Item key="2" icon={<LocationOnIcon />} style={{ marginTop: '20%' }}>
                        <Link to="flight-location-management">Flight Location Management</Link>
                    </Menu.Item>
                    <Menu.Item key="3" icon={<ConnectingAirportsIcon />} style={{ marginTop: '20%' }}>
                        <Link to="admin-report">Reports</Link>
                    </Menu.Item>
                    <Menu.Item key="4" icon={<ExitToAppIcon />} style={{ position: 'absolute', bottom: 20 }}>
                        <Link onClick={handleLogout}>Logout</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{ marginLeft: 272 }}>
                <Content style={{ padding: 32, minHeight: '100vh' }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}

export default AdminDashboardSider;
