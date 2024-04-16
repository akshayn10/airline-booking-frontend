import axios from "axios";
import { jwtDecode } from "jwt-decode";
import store from "../redux/store";
import {
  REFRESH_TOKEN_SUCCESS,
} from "../redux/constants/AuthConstants";
import { logout } from "../util/AuthUtils";

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
      console.log("Token:", token);
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
let failedRequests = [];
let isTokenRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const errorMessage = error.response ? error.response.data.message : null;
    const originalRequestConfig = error.config;

    if (errorMessage !== "JWT Access Token Expired") {
      return Promise.reject(error);
    }

    if (isTokenRefreshing) {
      return new Promise((resolve, reject) => {
        failedRequests.push({
          resolve,
          reject,
          config: originalRequestConfig,
          error: error,
        });
      });
    }

    isTokenRefreshing = true;

    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axiosInstance.get(
          `/auth/refresh-token/${refreshToken}`
        );
        const { accessToken } = response.data.data;
        localStorage.setItem("accessToken", accessToken);
        const decodedToken = jwtDecode(accessToken);
        localStorage.setItem("exp", decodedToken.exp);

        store.dispatch({
          type: REFRESH_TOKEN_SUCCESS,
          accessToken: accessToken,
        });

        console.log("Access token refreshed successfully.");

        failedRequests.forEach(({ resolve, reject, config }) => {
          axiosInstance(config)
            .then((response) => resolve(response))
            .catch((error) => reject(error));
        });
      } catch (error) {
        console.error(error);
        failedRequests.forEach(({ reject }) => reject(error));
        logout();
        return Promise.reject(error);
      } finally {
        failedRequests = [];
        isTokenRefreshing = false;
      }
    }
    return axiosInstance(originalRequestConfig);
  }
);

export default axiosInstance;