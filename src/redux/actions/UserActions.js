import {
  CANCEL_BOOKING_FAILURE,
  CANCEL_BOOKING_SUCCESS,
  GET_PAST_BOOKINGS_FAILURE,
  GET_PAST_BOOKINGS_SUCCESS,
  GET_UPCOMING_TRIPS_FAILURE,
  GET_UPCOMING_TRIPS_SUCCESS,
  GET_USER_DETAILS_BY_EMAIL_FAILURE,
  GET_USER_DETAILS_BY_EMAIL_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  UPDATE_USER_DETAILS_SUCCESS,
} from "../constants/UserConstants";
import axios from "../../config/Axios";

export const GetPastBookings = (userEmail) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/past-bookings/${userEmail}`);
    console.log(response);
    dispatch({
      type: GET_PAST_BOOKINGS_SUCCESS,
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
          type: GET_PAST_BOOKINGS_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: GET_PAST_BOOKINGS_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
export const GetUpcomingTrips = (userEmail) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/upcoming-trips/${userEmail}`);
    console.log(response);
    dispatch({
      type: GET_UPCOMING_TRIPS_SUCCESS,
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
          type: GET_UPCOMING_TRIPS_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: GET_UPCOMING_TRIPS_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
export const CancelBooking = (bookingId) => async (dispatch) => {
  try {
    const response = await axios.put(`/booking/cancel-booking/${bookingId}`);
    console.log(response);
    dispatch({
      type: CANCEL_BOOKING_SUCCESS,
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
          type: CANCEL_BOOKING_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: CANCEL_BOOKING_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
export const GetUserDetailsByEmail = (email) => async (dispatch) => {
  try {
    const response = await axios.get(`/user/by-email/${email}`);
    dispatch({
      type: GET_USER_DETAILS_BY_EMAIL_SUCCESS,
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
          type: GET_USER_DETAILS_BY_EMAIL_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: GET_USER_DETAILS_BY_EMAIL_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};

export const UpdateUserDetails = (userDetails) => async (dispatch) => {
  try {
    const response = await axios.put(`/user/${userDetails.email}`, {
      ...userDetails,
    });

    dispatch({
      type: UPDATE_USER_DETAILS_SUCCESS,
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
          type: UPDATE_USER_DETAILS_FAILURE,
          status: apiResponse.success,
          message: apiResponse.message,
        });
      }
    } else {
      dispatch({
        type: GET_USER_DETAILS_BY_EMAIL_FAILURE,
        status: "FAILED",
        message: "Something went wrong from server-side",
      });
    }
  }
};
