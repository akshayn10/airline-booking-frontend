import { configureStore } from '@reduxjs/toolkit'
import { AdminFlightLocationReducer, AdminFlightsReducer } from './reducers/AdminReducer'

const store = configureStore({
    reducer: {
        flightLocations: AdminFlightLocationReducer,
        flights: AdminFlightsReducer
    }
});

export default store;
