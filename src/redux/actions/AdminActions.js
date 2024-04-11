import axios from "../../config/Axios";
import { API_ERROR, API_SUCCESS, GET_FLEETS, GET_FLIGHT_LOCATIONS, GET_FLIGHTS, RESET_API_RESPONSE } from "../constants/AdminConstants"

export const ResetAPIResponse = () => async (dispatch) => {
    dispatch({ type: RESET_API_RESPONSE });
}

export const AddFlightLocation = (flightLocation) => async (dispatch) => {
    try {
        await axios.post("/v1/admin/location", { id: 0, ...flightLocation });
        dispatch({ type: API_SUCCESS, success: "Flight location created successfully" });
        dispatch(GetFlightLocations());
    } catch (error) {
        if (error.response?.status === 400) {
            dispatch({ type: API_ERROR, error: "Flight location code already exists" });
        } else {
            dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
        }
    }
}

export const AddFlight = (flight) => async (dispatch) => {
    try {
        await axios.post("/v1/admin/flight", { id: 0, ...flight });
        dispatch({ type: API_SUCCESS, success: "Flight created successfully" });
        dispatch(GetFlights());
    } catch (error) {
        if (error.response?.status === 400) {
            dispatch({ type: API_ERROR, error: "Flight already booked in between selected departure and arrival time period" });
        } else {
            dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
        }
    }
}

export const GetFlightLocations = () => async (dispatch) => {
    try {
        const response = await axios.get("/v1/admin/location");
        dispatch({ type: GET_FLIGHT_LOCATIONS, payload: response.data });
    } catch (error) {
        dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
    }
}

export const GetFleets = () => async (dispatch) => {
    try {
        const response = await axios.get("/v1/admin/fleet");
        dispatch({ type: GET_FLEETS, payload: response.data });
    } catch (error) {
        dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
    }
}

export const GetFlights = () => async (dispatch) => {
    try {
        const response = await axios.get("/v1/admin/flight");
        dispatch({ type: GET_FLIGHTS, payload: response.data });
    } catch (error) {
        dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
    }
}

export const UpdateFlightLocation = (flightLocation) => async (dispatch) => {
    try {
        await axios.patch("/v1/admin/location", flightLocation);
        dispatch({ type: API_SUCCESS, success: "Flight location updated successfully" });
        dispatch(GetFlightLocations());
    } catch (error) {
        if (error.response?.status === 400) {
            dispatch({ type: API_ERROR, error: "Flight location code already exists" });
        } else {
            dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
        }
    }
}

export const UpdateFlight = (flight) => async (dispatch) => {
    try {
        await axios.patch("/v1/admin/flight", flight);
        dispatch({ type: API_SUCCESS, success: "Flight updated successfully" });
        dispatch(GetFlights());
    } catch (error) {
        if (error.response?.status === 400) {
            dispatch({ type: API_ERROR, error: "Flight already booked in between selected departure and arrival time period" });
        } else {
            dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
        }
    }
}

export const DeleteFlightLocation = (flightLocationId) => async (dispatch) => {
    try {
        await axios.delete(`/v1/admin/location/${flightLocationId}`);
        dispatch({ type: API_SUCCESS, success: "Flight location deleted successfully" });
        dispatch(GetFlightLocations());
    } catch (error) {
        if (error.response?.status === 400) {
            dispatch({ type: API_ERROR, error: "Flight location already available in existing flight records" });
        } else {
            dispatch({ type: API_ERROR, error: "Something went wrong from server-side" });
        }
    }
}
