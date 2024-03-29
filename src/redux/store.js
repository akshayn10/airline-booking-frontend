import { configureStore } from '@reduxjs/toolkit'
import { AdminFleetReducer, AdminFlightLocationReducer, AdminFlightsReducer } from './reducers/AdminReducer'
import { PastBookingsReducer, UpcomingTripsReducer } from './reducers/UserReducer';

const store = configureStore({
        reducer: {
                flightLocationsReducer: AdminFlightLocationReducer,
                fleetsReducer: AdminFleetReducer,
                flightsReducer: AdminFlightsReducer,

                pastBookingsReducer: PastBookingsReducer,
                upcomingTripsReducer: UpcomingTripsReducer,
        }
});

export default store;
