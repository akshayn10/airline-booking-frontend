import axios from "../../config/Axois";
import {
  GET_FLIGHT_LOCATIONS,
  GET_FLIGHTS,
  SEARCH_SIMPLE,
} from "../constants/SearchConstants";

export const GetFlightLocations = () => async (dispatch) => {
  //const response = await axios.get("/v1/search/location");
  //dispatch({ type: GET_FLIGHT_LOCATIONS, payload: response.data });

  try {
    const response = await axios.get("/v1/search/location"); // Replace with your backend API endpoint for cities
    dispatch({ type: GET_FLIGHT_LOCATIONS, payload: response.data });
  } catch (error) {
    console.error("Error fetching cities:", error);
    // Handle error (dispatch an error action if needed)
  }
};

export const GetFlights = () => async (dispatch) => {
  try {
    const response = await axios.get("/v1/search/flight");
    dispatch({ type: GET_FLIGHTS, payload: response.data });
  } catch (error) {
    console.error("Error fetching Flights:", error);
  }
};

export const searchSimpleFlights = (searchArguments) => async (dispatch) => {
  // Simulate API call with mock data (replace with your actual API logic)

  try {
    const response = await axios.get(
      `/v1/search/flight?departureLocation=${searchArguments.fromCity}arrivalLocation=${searchArguments.toCity}`
    );
    dispatch({ type: SEARCH_SIMPLE, payload: response.data });
  } catch (error) {
    console.error("Error fetching flights:", error);

    throw error; // Re-throw the error for proper handling
  }
};
