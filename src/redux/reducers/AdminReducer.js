import { CREATE_FLIGHT, CREATE_FLIGHT_LOCATION, DELETE_FLIGHT, DELETE_FLIGHT_LOCATION, GET_FLEETS, GET_FLIGHT_LOCATIONS, GET_FLIGHTS, UPDATE_FLIGHT, UPDATE_FLIGHT_LOCATION } from "../constants/AdminConstants";

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

export const AdminFlightLocationReducer = (state = flightLocationsState, action) => {
    switch (action.type) {
        case CREATE_FLIGHT_LOCATION:
            return { ...state, flightLocations: action.payload }
        case UPDATE_FLIGHT_LOCATION:
            return { ...state, flightLocations: action.payload }
        case DELETE_FLIGHT_LOCATION:
            return { ...state, flightLocations: action.payload }
        case GET_FLIGHT_LOCATIONS:
            return { ...state, flightLocations: action.payload }
        default:
            return state;
    }
}

export const AdminFleetReducer = (state = fleetsState, action) => {
    switch (action.type) {
        case GET_FLEETS:
            return { ...state, fleets: action.payload }
        default:
            return state;
    }
}

export const AdminFlightsReducer = (state = flightsState, action) => {
    switch (action.type) {
        case CREATE_FLIGHT:
            return { ...state, flights: action.payload }
        case GET_FLIGHTS:
            return { ...state, flights: action.payload }
        case UPDATE_FLIGHT:
            return { ...state, flights: action.payload }
        case DELETE_FLIGHT:
            return { ...state, flights: action.payload }
        default:
            return state;
    }
}
