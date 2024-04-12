import axios from "axios";
import { jwtDecode } from "jwt-decode";
import store from "../redux/store";
import { REFRESH_TOKEN } from "../redux/constants/AuthConstants";

const jwtInterceptionExcludedUrls = ["/auth"];

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (
      !jwtInterceptionExcludedUrls.some((url) => config.url.startsWith(url))
    ) {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    if (response.data.error) {
    }
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;
    const errorMessage = error.response ? error.response.data.message : null;
    if (status === 401) {
      if (errorMessage === "JWT Access Token Expired") {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          refreshAccessToken(refreshToken);
        }
      }
    } else {
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
async function refreshAccessToken(refreshToken) {
  try {
    const response = await axiosInstance.get(
      `/auth/refresh-token/${refreshToken}`
    );
    const { accessToken } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    const decodedToken = jwtDecode(accessToken);
    localStorage.setItem("exp", decodedToken.exp);

    store.dispatch({
      type: REFRESH_TOKEN,
      accessToken: accessToken,
    });

    console.log("Access token refreshed successfully.");
  } catch (error) {
    console.error("Error refreshing access token:", error.message);
    const apiResponse = error.response.data;
    window.alert(apiResponse.message);

    throw error;
  }
}
