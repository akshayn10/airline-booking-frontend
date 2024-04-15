import {
  GET_UPCOMING_TRIPS,
  GET_PAST_BOOKINGS,
  GET_USER_DETAILS_BY_EMAIL_SUCCESS,
  GET_USER_DETAILS_BY_EMAIL_FAILURE,
  UPDATE_USER_DETAILS_SUCCESS,
  UPDATE_USER_DETAILS_FAILURE,
} from "../constants/UserConstants";

const upcomingTripsState = {
  isLoading: false,
  upcomingTrips: [],
};

const pastBookingsState = {
  isLoading: false,
  pastBookings: [],
};
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

export const GetUserByEmailReducer = (state = userByEmailResponseState, action) => {
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
  
export const UpcomingTripsReducer = (state = upcomingTripsState, action) => {
  switch (action.type) {
    case GET_UPCOMING_TRIPS:
      return {
        ...state,
        isLoading: true,
        upcomingTrips: action.payload,
      };
    default:
      return state;
  }
};

export const PastBookingsReducer = (state = pastBookingsState, action) => {
  switch (action.type) {
    case GET_PAST_BOOKINGS:
      return {
        ...state,
        isLoading: true,
        pastBookings: action.payload,
      };
    default:
      return state;
  }
};
