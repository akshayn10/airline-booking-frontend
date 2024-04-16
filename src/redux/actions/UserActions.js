import {
  CANCEL_BOOKING_FAILURE,
  CANCEL_BOOKING_SUCCESS,
  GET_PAST_BOOKINGS_FAILURE,
  GET_PAST_BOOKINGS_SUCCESS,
  GET_UPCOMING_TRIPS_FAILURE,
  GET_UPCOMING_TRIPS_SUCCESS,
  GET_USER_DETAILS_BY_EMAIL_FAILURE,
  GET_USER_DETAILS_BY_EMAIL_SUCCESS,
} from "../constants/UserConstants";
import axios from "../../config/Axios";
const pastBookings = [
  {
    bookingReference: "REF123456789",
    flightDetails: "Flight 1: JFK to LAX",
    bookingDate: "2023-12-15",
    passengerNames: ["John Doe", "Jane Doe"],
    seatNumbers: ["14A", "14B"],
    bookingStatus: "Completed",
    totalCost: 600,
    actions: ["View Details", "Leave Feedback"],
  },
  {
    bookingReference: "REF987654321",
    flightDetails: "Flight 2: SFO to ORD",
    bookingDate: "2023-11-20",
    passengerNames: ["Alice Smith", "Bob Smith"],
    seatNumbers: ["22C", "22D"],
    bookingStatus: "Canceled",
    totalCost: 400,
    actions: ["View Details"],
  },
  {
    bookingReference: "REF567890123",
    flightDetails: "Flight 3: LHR to CDG",
    bookingDate: "2023-10-05",
    passengerNames: ["Emily Johnson"],
    seatNumbers: ["7F"],
    bookingStatus: "Completed",
    totalCost: 250,
    actions: ["View Details", "Leave Feedback"],
  },
];

const upcomingTrips = [
  {
    bookingReference: "REF345678901",
    flightDetails: "Flight 4: CDG to JFK",
    departureTime: "2024-05-20 10:00 AM",
    arrivalTime: "2024-05-20 02:00 PM",
    passengerNames: ["John Doe", "Jane Doe"],
    seatNumbers: ["12A", "12B"],
    bookingStatus: "Confirmed",
    actions: ["Check-in Online", "Modify Booking"],
  },
  {
    bookingReference: "REF901234567",
    flightDetails: "Flight 5: LAX to ORD",
    departureTime: "2024-06-10 08:30 AM",
    arrivalTime: "2024-06-10 12:00 PM",
    passengerNames: ["Alice Smith"],
    seatNumbers: ["15C"],
    bookingStatus: "Confirmed",
    actions: ["Check-in Online"],
  },
  {
    bookingReference: "REF234567890",
    flightDetails: "Flight 6: ORD to SFO",
    departureTime: "2024-07-01 01:00 PM",
    arrivalTime: "2024-07-01 04:30 PM",
    passengerNames: ["Bob Smith"],
    seatNumbers: ["20D"],
    bookingStatus: "Pending",
    actions: ["Modify Booking"],
  },
];

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
    const response = await axios.get(`/book/cancel-booking/${bookingId}`);
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
