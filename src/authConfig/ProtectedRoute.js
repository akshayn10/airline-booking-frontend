import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children, roles }) => {
  const userRoleFromStore = useSelector(
    (state) => state.authenticationStateReducer.role
  );
  const userRoleFromLocalStorage = localStorage.getItem("role");

  if(userRoleFromLocalStorage!==userRoleFromStore){
    console.log(userRoleFromStore,"Role")
    localStorage.setItem("role",userRoleFromStore)
  }

  if (!userRoleFromStore || !roles.includes(userRoleFromStore)) {
    return <Navigate to="/auth/login" replace />;
  }
  return children || <Outlet />;
};

export default ProtectedRoute;
