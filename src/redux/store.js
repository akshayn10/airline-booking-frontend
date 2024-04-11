import { configureStore } from '@reduxjs/toolkit'
import { AdminFleetReducer, AdminFlightLocationReducer, AdminFlightsReducer, ApiErrorReducer } from './reducers/AdminReducer'
import { PastBookingsReducer, UpcomingTripsReducer } from './reducers/UserReducer';
import { CountryListReducer, LoginResponseReducer } from './reducers/AuthReducer';

const store = configureStore({
        reducer: {
                apiErrorReducer: ApiErrorReducer,
                flightLocationsReducer: AdminFlightLocationReducer,
                fleetsReducer: AdminFleetReducer,
                flightsReducer: AdminFlightsReducer,

                pastBookingsReducer: PastBookingsReducer,
                upcomingTripsReducer: UpcomingTripsReducer,

                countryListReducer: CountryListReducer,

                loginResponseReducer: LoginResponseReducer,

        }
});

export default store;
