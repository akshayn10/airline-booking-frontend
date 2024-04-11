import axios from "../../config/Axois";
import { GET_FLIGHT_LOCATIONS } from "../constants/SearchConstants";

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
