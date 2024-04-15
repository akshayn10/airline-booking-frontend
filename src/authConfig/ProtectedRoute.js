import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children, roles }) => {
  const userRoleFromStore = useSelector(
    (state) => state.authenticationStateReducer.role
  );
  console.log(userRoleFromStore, "userRoleFromStore");
  const userRoleFromLocalStorage = localStorage.getItem("role");
  console.log(userRoleFromLocalStorage,"userRoleFromLocalStorage");

  if(userRoleFromLocalStorage!==userRoleFromStore){
    localStorage.setItem("role",userRoleFromStore)
  }

  if (!userRoleFromStore || !roles.includes(userRoleFromStore)) {
    return <Navigate to="/auth/login" replace />;
  }
  return children || <Outlet />;
};

export default ProtectedRoute;
