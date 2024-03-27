import { CREATE_FLIGHT, CREATE_FLIGHT_LOCATION, DELETE_FLIGHT, DELETE_FLIGHT_LOCATION, GET_FLEETS, GET_FLIGHT_LOCATIONS, GET_FLIGHTS, UPDATE_FLIGHT, UPDATE_FLIGHT_LOCATION } from "../constants/AdminConstants"

let flightLocations = [
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

let fleets = [
    {
        id: '1',
        code: '1200',
        model: 'Boeing',
        totalEconomySeats: 50,
        totalPremiumSeats: 30,
        totalBusinessSeats: 30
    },
    {
        id: '2',
        code: '1201',
        model: 'AirBus',
        totalEconomySeats: 100,
        totalPremiumSeats: 60,
        totalBusinessSeats: 60
    }
];

let flights = [];

export const AddFlightLocation = (flightLocation) => async (dispatch) => {
    flightLocations = [...flightLocations, flightLocation];
    dispatch({ type: CREATE_FLIGHT_LOCATION, payload: flightLocations });
}

export const AddFlight = (flight) => async (dispatch) => {
    flights = [...flights, flight];
    dispatch({ type: CREATE_FLIGHT, payload: flights });
}

export const GetFlightLocations = () => async (dispatch) => {
    dispatch({ type: GET_FLIGHT_LOCATIONS, payload: flightLocations });
}

export const GetFleets = () => async (dispatch) => {
    dispatch({ type: GET_FLEETS, payload: fleets });
}

export const GetFlights = () => async (dispatch) => {
    dispatch({ type: GET_FLIGHTS, payload: flights });
}

export const UpdateFlightLocation = (flightLocation, updatedFlightLocationId) => async (dispatch) => {
    const existingFlightLocations = [...flightLocations];
    const index = existingFlightLocations.findIndex((item) => item.id === updatedFlightLocationId);
    const item = existingFlightLocations[index];
    existingFlightLocations.splice(index, 1, {
        ...item,
        ...flightLocation,
    });
    flightLocations = existingFlightLocations;

    dispatch({ type: UPDATE_FLIGHT_LOCATION, payload: flightLocations });
}

export const UpdateFlight = (flight, updatedFlightId) => async (dispatch) => {
    const newData = {
        ...flight,
        departureTime: flight['departureAndArrival'][0],
        arrivalTime: flight['departureAndArrival'][1]
    }
    delete newData.departureAndArrival;

    const existingFlightData = [...flights];
    const index = existingFlightData.findIndex((item) => updatedFlightId === item.id);
    const item = existingFlightData[index];
    existingFlightData.splice(index, 1, {
        ...item,
        ...newData,
    });
    flights = existingFlightData;

    dispatch({ type: UPDATE_FLIGHT, payload: flights });
}

export const DeleteFlightLocation = (flightLocationId) => async (dispatch) => {
    flightLocations = flightLocations.filter((item) => item.id !== flightLocationId);

    dispatch({ type: DELETE_FLIGHT_LOCATION, payload: flightLocations });
}

export const DeleteFlight = (flightId) => async (dispatch) => {
    flights = flights.filter((item) => item.id !== flightId);

    dispatch({ type: DELETE_FLIGHT, payload: flights });
}
