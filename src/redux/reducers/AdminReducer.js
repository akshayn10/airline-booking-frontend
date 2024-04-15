import { API_ERROR, API_SUCCESS, FLIGHT_LOCATIONS_LOADING, FLIGHTS_LOADING, GET_FLEETS, GET_FLIGHT_LOCATIONS, GET_FLIGHTS, RESET_API_RESPONSE } from "../constants/AdminConstants";

const flightLocationsState = {
    isLoading: false,
    flightLocations: [],
}

const fleetsState = {
    isLoading: false,
    fleets: []
}

const flightsState = {
    isLoading: false,
    flights: [],
}

const apiResponse = {
    responseType: '',
    responseMessage: ''
}

export const ApiErrorReducer = (state = apiResponse, action) => {
    if (action.type === API_ERROR) {
        return { ...state, responseType: 'error', responseMessage: action.error }
    } else if (action.type === API_SUCCESS) {
        return { ...state, responseType: 'success', responseMessage: action.success }
    } else if (action.type === RESET_API_RESPONSE) {
        return apiResponse;
    }
    else {
        return state;
    }
}

export const AdminFlightLocationReducer = (state = flightLocationsState, action) => {
    if (action.type === GET_FLIGHT_LOCATIONS)
        return { ...state, flightLocations: action.payload, isLoading: false }
    else if (action.type === FLIGHT_LOCATIONS_LOADING) {
        return { ...state, isLoading: true }
    }
    else
        return state;
}

export const AdminFleetReducer = (state = fleetsState, action) => {
    if (action.type === GET_FLEETS)
        return { ...state, fleets: action.payload }
    else
        return state;
}

export const AdminFlightsReducer = (state = flightsState, action) => {
    if (action.type === GET_FLIGHTS)
        return { ...state, flights: action.payload, isLoading: false }
    else if (action.type === FLIGHTS_LOADING) {
        return { ...state, isLoading: true }
    }
    else
        return state;
}
