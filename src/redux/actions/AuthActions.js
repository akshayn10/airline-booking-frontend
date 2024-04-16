import {
  ADD_CONTACT_DETAILS_FAILURE,
  ADD_CONTACT_DETAILS_SUCCESS,
  AUTHENTICATED,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  EMAIL_CONFIRMATION_FAILURE,
  EMAIL_CONFIRMATION_SUCCESS,
  FORGOT_PASSWORD_CONFIRMATION_FAILURE,
  FORGOT_PASSWORD_CONFIRMATION_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  GET_COUNTRY_LIST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET_AUTHENTICATION,
  RESET_LOGIN_STATE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from "../constants/AuthConstants";

import countryList from "../../assets/json/countries.json";
import axios from "../../config/Axios";
import { jwtDecode } from "jwt-decode";
import { clearLocalStorage } from "../../util/localStorageUtils";

export const getCountryList = () => async (dispatch) => {
  dispatch({
    type: GET_COUNTRY_LIST,
    payload: countryList,
  });
};

export const RegisterUser = (registerUserData) => async (dispatch) => {
  clearLocalStorage();
  try {
    const response = await axios.post("/auth/register", {
      ...registerUserData,
    });

    dispatch({
      type: REGISTER_SUCCESS,
      status: response.data.success,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: REGISTER_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};

export const ConfirmEmailWithOTP = (confirmEmailData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/email-confirmation", {
      ...confirmEmailData,
    });
    dispatch({
      type: EMAIL_CONFIRMATION_SUCCESS,
      status: response.data.success,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: EMAIL_CONFIRMATION_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: EMAIL_CONFIRMATION_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};

export const LoginUser = (loginUserData) => async (dispatch) => {
  clearLocalStorage();
  try {
    const response = await axios.post("/auth/login", { ...loginUserData });
    const { accessToken, refreshToken, user } = response.data.data;

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("user", JSON.stringify(user));
    const decodedToken = jwtDecode(accessToken);
    const { role, sub, exp } = decodedToken;
    console.log("Role:", role);
    console.log("Email:", sub);
    console.log("Expiration Time:", new Date(exp * 1000));
    localStorage.setItem("role", role);
    localStorage.setItem("email", sub);
    localStorage.setItem("exp", exp);

    dispatch({
      type: LOGIN_SUCCESS,
      status: response.data.success,
      data: response.data.data,
      message: response.data.message,
    });
    dispatch({
      type: AUTHENTICATED,
      authenticated: true,
      accessToken: accessToken,
      refreshToken: refreshToken,
      user: user,
      role: role,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: LOGIN_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: LOGIN_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
export const ResetLoginResponseState = () => async (dispatch) => {
  dispatch({
    type: RESET_LOGIN_STATE,
  });
};
export const SaveContactDetails = (contactDetails) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/contact-details", {
      ...contactDetails,
    });
    dispatch({
      type: ADD_CONTACT_DETAILS_SUCCESS,
      status: response.data.success,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: ADD_CONTACT_DETAILS_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: ADD_CONTACT_DETAILS_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};

export const ForgotPassword = (forgotPasswordData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/forgot-password", {
      ...forgotPasswordData,
    });

    dispatch({
      type: FORGOT_PASSWORD_SUCCESS,
      status: response.data.success,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: FORGOT_PASSWORD_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: FORGOT_PASSWORD_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};

export const ForgotPasswordConfirmation =
  (forgotPasswordConfirmationData) => async (dispatch) => {
    try {
      const response = await axios.post("/auth/forgot-password-confirmation", {
        ...forgotPasswordConfirmationData,
      });

      dispatch({
        type: FORGOT_PASSWORD_CONFIRMATION_SUCCESS,
        status: response.data.success,
        message: response.data.message,
        data: response.data.data,
      });
    } catch (error) {
      if (error.response?.data) {
        const apiResponse = error.response?.data;
        console.log(apiResponse);
        if (apiResponse.success === false) {
          dispatch({
            type: FORGOT_PASSWORD_CONFIRMATION_FAILURE,
            status: apiResponse.success,
            message: apiResponse.message,
          });
        }
      } else {
        dispatch({
          type: FORGOT_PASSWORD_CONFIRMATION_FAILURE,
          status: "FAILED",
          message: "Something went wrong from server-side",
        });
      }
    }
  };
export const ResetPassword = (resetPasswordData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/reset-password", {
      ...resetPasswordData,
    });
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      status: response.data.success,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: RESET_PASSWORD_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: REGISTER_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
export const ResetAuthentication = () => async (dispatch) => {
  dispatch({
    type: RESET_AUTHENTICATION,
  });
};

export const LogOutUser = () => async (dispatch) => {
  dispatch({
    type: RESET_AUTHENTICATION,
  });
};

export const ChangePassword = (changePasswordData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/change-password", {
      ...changePasswordData,
    });

    dispatch({
      type: CHANGE_PASSWORD_SUCCESS,
      status: response.data.success,
      message: response.data.message,
      data: response.data.data,
    });
  } catch (error) {
    if (error.response?.data) {
      const apiResponse = error.response?.data;
      console.log(apiResponse);
      if (apiResponse.success === false) {
        dispatch({
          type: CHANGE_PASSWORD_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: CHANGE_PASSWORD_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
