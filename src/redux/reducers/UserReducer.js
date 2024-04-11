import {
  GET_UPCOMING_TRIPS,
  GET_PAST_BOOKINGS,
} from "../constants/UserConstants";

const upcomingTripsState = {
  isLoading: false,
  upcomingTrips: [],
};

const pastBookingsState = {
  isLoading: false,
  pastBookings: [],
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
