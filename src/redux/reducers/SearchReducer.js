import {
  GET_FLIGHT_LOCATIONS,
  GET_FLIGHTS,
  SEARCH_SIMPLE,
} from "../constants/SearchConstants";

const flightLocationsState = {
  isLoading: false,
  flightLocations: [],
};

const flightsState = {
  isLoading: false,
  flights: [],
};

export const SearchFlightLocationReducer = (
  state = flightLocationsState,
  action
) => {
  if (action.type === GET_FLIGHT_LOCATIONS)
    return { ...state, flightLocations: action.payload };
  else return state;
};

export const SearchFlightsReducer = (state = flightsState, action) => {
  if (action.type === GET_FLIGHTS) return { ...state, flights: action.payload };
  else if (action.type === SEARCH_SIMPLE)
    return { ...state, flights: action.payload };
  else return state;
};
