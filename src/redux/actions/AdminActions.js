import axios from "../../config/Axois";
import { GET_FLEETS, GET_FLIGHT_LOCATIONS, GET_FLIGHTS } from "../constants/AdminConstants"

export const AddFlightLocation = (flightLocation) => async (dispatch) => {
    await axios.post("/v1/admin/location", { id: 0, ...flightLocation });
    dispatch(GetFlightLocations());
}

export const AddFlight = (flight) => async (dispatch) => {
    await axios.post("/v1/admin/flight", { id: 0, ...flight });
    dispatch(GetFlights());
}

export const GetFlightLocations = () => async (dispatch) => {
    const response = await axios.get("/v1/admin/location");
    dispatch({ type: GET_FLIGHT_LOCATIONS, payload: response.data });
}

export const GetFleets = () => async (dispatch) => {
    const response = await axios.get("/v1/admin/fleet");
    dispatch({ type: GET_FLEETS, payload: response.data });
}

export const GetFlights = () => async (dispatch) => {
    const response = await axios.get("/v1/admin/flight");
    dispatch({ type: GET_FLIGHTS, payload: response.data });
}

export const UpdateFlightLocation = (flightLocation) => async (dispatch) => {
    await axios.patch("/v1/admin/location", flightLocation);
    dispatch(GetFlightLocations());
}

export const UpdateFlight = (flight) => async (dispatch) => {
    await axios.patch("/v1/admin/flight", flight);
    dispatch(GetFlights());
}

export const DeleteFlightLocation = (flightLocationId) => async (dispatch) => {
    await axios.delete(`/v1/admin/location/${flightLocationId}`);
    dispatch(GetFlightLocations());
}

export const DeleteFlight = (flightId) => async (dispatch) => {
    await axios.delete(`/v1/admin/flight/${flightId}`);
    dispatch(GetFlights());
}
