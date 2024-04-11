import {
  API_ERROR,
  API_SUCCESS,
  GET_COUNTRY_LIST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  RESET_LOGIN_STATE,
} from "../constants/AuthConstants";
import countryList from "../../assets/json/countries.json";
import axios from "../../config/Axios";

export const getCountryList = () => async (dispatch) => {
  dispatch({
    type: GET_COUNTRY_LIST,
    payload: countryList,
  });
};

export const RegisterUser = (registerUserData) => async (dispatch) => {
  try {
    await axios.post("/auth/register", { ...registerUserData });
    dispatch({
      type: API_SUCCESS,
      success: "Flight location created successfully",
    });
  } catch (error) {
    if (error.response?.status === 400) {
      dispatch({ type: API_ERROR, error: "User Name already exist" });
    } else {
      dispatch({
        type: API_ERROR,
        error: "Something went wrong from server-side",
      });
    }
  }
};

export const ConfirmEmail = (confirmEmailData) => async (dispatch) => {
  try {
    await axios.post("/auth/email-confirmation", { ...confirmEmailData });
    dispatch({
      type: API_SUCCESS,
      success: "Email Created successfully",
    });
  } catch (error) {
    if (error.response?.status === 400) {
      dispatch({ type: API_ERROR, error: "User with email already exist" });
    } else {
      dispatch({
        type: API_ERROR,
        error: "Something went wrong from server-side",
      });
    }
  }
};
// export const LoginUser = (loginUserData) => async (dispatch) => {
//   try {
//     await axios.post("/auth/login", { ...loginUserData });
//     dispatch({
//       type: API_SUCCESS,
//       success: "Login Successful",
//     });
//   } catch (error) {
//     if (error.response?.status === 400) {
//       dispatch({ type: API_ERROR, error: "User not exist with email" });
//     } else {
//       dispatch({
//         type: API_ERROR,
//         error: "Something went wrong from server-side",
//       });
//     }
//   }
// };

export const LoginUser = (loginUserData) => async (dispatch) => {
  try {
    const response = await axios.post("/auth/login", { ...loginUserData });
    const { accessToken, refreshToken, username } = response.data.data;
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("username", username);

    console.log(accessToken, refreshToken, username);
    dispatch({
      type: LOGIN_SUCCESS,
      status: response.data.success,
      data: response.data.data,
      message: response.data.message,
    });
  } catch (error) {
    if (error.response?.status === 400 && error.response.data) {
      const apiResponse = error.response.data;
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
    type: RESET_LOGIN_STATE
  });
};
export const SaveContactDetails = (contactDetails) => async (dispatch) => {
  try {
    await axios.post("/auth/contact-details", { ...contactDetails });
    dispatch({
      type: API_SUCCESS,
      success: "Contact Saved",
    });
  } catch (error) {
    dispatch({
      type: API_ERROR,
      error: "Something went wrong from server-side",
    });
  }
};

export const ForgotPassword = (forgotPasswordData) => async (dispatch) => {
  try {
    await axios.post("/auth/forgot-password", { ...forgotPasswordData });
    dispatch({
      type: API_SUCCESS,
      success: "Forgot password request Successful",
    });
  } catch (error) {
    dispatch({
      type: API_ERROR,
      error: "Something went wrong from server-side",
    });
  }
};

export const ForgotPasswordConfirmation =
  (forgotPasswordConfirmationData) => async (dispatch) => {
    try {
      await axios.post("/auth/forgot-password-confirmation", {
        ...forgotPasswordConfirmationData,
      });
      dispatch({
        type: API_SUCCESS,
        success: "Forgot password Confirmation Successful",
      });
    } catch (error) {
      dispatch({
        type: API_ERROR,
        error: "Something went wrong from server-side",
      });
    }
  };
export const ResetPassword = (resetPasswordData) => async (dispatch) => {
  try {
    await axios.post("/auth/reset-password", { ...resetPasswordData });
    dispatch({
      type: API_SUCCESS,
      success: "Password reset Successful",
    });
  } catch (error) {
    dispatch({
      type: API_ERROR,
      error: "Something went wrong from server-side",
    });
  }
};

export const ChangePassword = (changePasswordData) => async (dispatch) => {
  try {
    await axios.post("/auth/change-password", { ...changePasswordData });
    dispatch({
      type: API_SUCCESS,
      success: "Password Change Successful",
    });
  } catch (error) {
    dispatch({
      type: API_ERROR,
      error: "Something went wrong from server-side",
    });
  }
};
