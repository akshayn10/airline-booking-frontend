import { GET_FLIGHT_LOCATIONS } from "../constants/SearchConstants";

const flightLocationsState = {
  isLoading: false,
  flightLocations: [],
};

export const SearchFlightLocationReducer = (
  state = flightLocationsState,
  action
) => {
  if (action.type === GET_FLIGHT_LOCATIONS)
    return { ...state, flightLocations: action.payload };
  else return state;
};
