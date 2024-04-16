import {
  GET_UPCOMING_TRIPS,
  GET_PAST_BOOKINGS,
  GET_USER_DETAILS_BY_EMAIL_SUCCESS,
  GET_USER_DETAILS_BY_EMAIL_FAILURE,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
  GET_PAST_BOOKINGS_FAILURE,
  GET_UPCOMING_TRIPS_SUCCESS,
  GET_UPCOMING_TRIPS_FAILURE,
  GET_PAST_BOOKINGS_SUCCESS,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAILURE,
} from "../constants/UserConstants";

const userByEmailResponseState = {
  status: null,
  data: null,
  message: null,
};
const updateUserResponseState = {
  status: null,
  data: null,
  message: null,
};
const pastBookingsResponseState = {
  status: null,
  data: null,
  message: null,
};
const upcomingTripsResponseState = {
  status: null,
  data: null,
  message: null,
};

const cancelBookingResponseState = {
  status: null,
  data: null,
  message: null,
};

export const GetUserByEmailReducer = (
  state = userByEmailResponseState,
  action
) => {
  switch (action.type) {
    case GET_USER_DETAILS_BY_EMAIL_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case GET_USER_DETAILS_BY_EMAIL_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};
export const UpdateUserReducer = (state = updateUserResponseState, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case UPDATE_USER_DETAILS_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};

export const PastBookingsResponseReducer = (
  state = pastBookingsResponseState,
  action
) => {
  switch (action.type) {
    case GET_PAST_BOOKINGS_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case GET_PAST_BOOKINGS_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};


export const UpcomingTripsResponseReducer = (
  state = upcomingTripsResponseState,
  action
) => {
  switch (action.type) {
    case GET_UPCOMING_TRIPS_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case GET_UPCOMING_TRIPS_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};

export const CancelBookingResponseReducer = (
  state = pastBookingsResponseState,
  action
) => {
  switch (action.type) {
    case CANCEL_BOOKING_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case CANCEL_BOOKING_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};