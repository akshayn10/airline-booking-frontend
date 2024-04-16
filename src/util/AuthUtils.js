import { RESET_AUTHENTICATION } from "../redux/constants/AuthConstants";
import store from "../redux/store";
import { clearLocalStorage } from "./localStorageUtils";

const isAuthenticated = () => {
  const accessToken = localStorage.getItem("accessToken");
  const exp = localStorage.getItem("exp");

  if (!accessToken || !exp) {
    console.log("No token");
    return false;
  }
  const expirationTime = new Date(parseInt(exp, 10) * 1000);

  const currentTime = new Date();

  if (currentTime < expirationTime) {
    console.log("Token is valid");
    return true;
  } else {
    console.log("Token is expired");
    return false;
  }
};
const isTokenExpired = () => {
  const exp = localStorage.getItem("exp");

  if (!exp) {
    return true;
  }
  const expirationTime = new Date(parseInt(exp, 10) * 1000);

  const currentTime = new Date();

  return currentTime > expirationTime;
};
const logout = () => {
  store.dispatch({
    type: RESET_AUTHENTICATION,
  });
  clearLocalStorage();
  window.location.href = "/auth/login";
};
export { isAuthenticated, isTokenExpired, logout };
