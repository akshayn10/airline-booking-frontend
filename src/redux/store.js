import { configureStore } from '@reduxjs/toolkit'
import { AdminFleetReducer, AdminFlightLocationReducer, AdminFlightsReducer } from './reducers/AdminReducer'

const store = configureStore({
    reducer: {
        flightLocationsReducer: AdminFlightLocationReducer,
        fleetsReducer: AdminFleetReducer,
        flightsReducer: AdminFlightsReducer
    }
});

export default store;
