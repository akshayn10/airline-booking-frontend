import { Route, Routes } from "react-router-dom";
import AdminDahboardSider from "./AdminDashboardSider.js";
import FlightLocationManagement from "./FlightLocationManagement.js";
import FlightManagement from "./FlightManagement.js";

const AdminRoute = () => {
    return (
        <AdminDahboardSider>
            <Routes>
                <Route path="admin/flight-management" element={<FlightManagement />} />
                <Route path="admin/flight-location-management" element={<FlightLocationManagement />} />
            </Routes>
        </AdminDahboardSider>
    )
}

export default AdminRoute;
