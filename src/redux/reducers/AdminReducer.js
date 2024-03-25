import { CREATE_FLIGHT, CREATE_FLIGHT_LOCATION, GET_FLIGHT_LOCATIONS, GET_FLIGTS } from "../constants/AdminConstants";

const initialFlightLocations = [
    {
        id: '0',
        country: 'Sri Lanka',
        cityName: 'Katunayake',
        airportName: 'Katunayake International Airport',
        code: '941'
    },
    {
        id: '1',
        country: 'United Arab Emirates',
        cityName: 'Dubai',
        airportName: 'Dubai International Airport',
        code: '971'
    },
];
const initialFlights = [];

export const AdminFlightLocationReducer = (state = { flightLocations: initialFlightLocations }, action) => {
    switch (action.type) {
        case CREATE_FLIGHT_LOCATION:
            return { flightLocations: [...state.flightLocations, action.payload] };
        case GET_FLIGHT_LOCATIONS:
            return { flightLocations: state.flightLocations };
        default:
            return state;
    }
}

export const AdminFlightsReducer = (state = { flights: initialFlights }, action) => {
    switch (action.type) {
        case CREATE_FLIGHT:
            return { flights: [...state.flights, action.payload] };
        case GET_FLIGTS:
            return { flights: state.flights };
        default:
            return state;
    }
}
