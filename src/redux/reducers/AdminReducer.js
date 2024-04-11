import {
  GET_FLEETS,
  GET_FLIGHT_LOCATIONS,
  GET_FLIGHTS,
} from "../constants/AdminConstants";

const flightLocationsState = {
  isLoading: false,
  flightLocations: [],
};

const fleetsState = {
  isLoading: false,
  fleets: [],
};

const flightsState = {
  isLoading: false,
  flights: [],
};

export const AdminFlightLocationReducer = (
  state = flightLocationsState,
  action
) => {
  if (action.type === GET_FLIGHT_LOCATIONS)
    return { ...state, flightLocations: action.payload };
  else return state;
};

export const AdminFleetReducer = (state = fleetsState, action) => {
  if (action.type === GET_FLEETS) return { ...state, fleets: action.payload };
  else return state;
};

export const AdminFlightsReducer = (state = flightsState, action) => {
  if (action.type === GET_FLIGHTS) return { ...state, flights: action.payload };
  else return state;
};
