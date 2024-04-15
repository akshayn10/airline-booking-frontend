import { Route, Routes } from "react-router-dom";
import FlightLocationManagement from "./FlightLocationManagement.js";
import FlightManagement from "./FlightManagement.js";
import AdminDashboardSider from "./AdminDashboardSider.js";
import AdminFlightReport from "./AdminFlightReport.js";

const AdminRouter = () => {
    return (
        <AdminDashboardSider>
            <Routes>
                <Route path="flight-management" element={<FlightManagement />} />
                <Route path="flight-location-management" element={<FlightLocationManagement />} />
                <Route path="admin-report" element={<AdminFlightReport/>}/>
            </Routes>
        </AdminDashboardSider>
    );
}

export default AdminRouter;
