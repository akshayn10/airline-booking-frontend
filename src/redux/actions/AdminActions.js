import { CREATE_FLIGHT, CREATE_FLIGHT_LOCATION, GET_FLIGHT_LOCATIONS, GET_FLIGTS } from "../constants/AdminConstants"

export const AddFlightLocation = (flightLocation) => async (dispatch) => {
    dispatch({ type: CREATE_FLIGHT_LOCATION, payload: flightLocation });
}

export const GetFlightLocations = () => async (dispatch) => {
    dispatch({ type: GET_FLIGHT_LOCATIONS });
}

export const GetFlights = () => async (dispatch) => {
    dispatch({ type: GET_FLIGTS });
}

export const AddFlight = (flight) => async (dispatch) => {
    dispatch({ type: CREATE_FLIGHT, payload: flight });
}

