import { configureStore } from "@reduxjs/toolkit";
import {
  AdminFleetReducer,
  AdminFlightLocationReducer,
  AdminFlightsReducer,
} from "./reducers/AdminReducer";
import {
  PastBookingsReducer,
  UpcomingTripsReducer,
} from "./reducers/UserReducer";
import { CountryListReducer } from "./reducers/AuthReducer";
import {
  SearchFlightLocationReducer,
  SearchFlightsReducer,
} from "./reducers/SearchReducer";

const store = configureStore({
  reducer: {
    flightLocationsReducer: AdminFlightLocationReducer,
    fleetsReducer: AdminFleetReducer,
    flightsReducer: AdminFlightsReducer,

    pastBookingsReducer: PastBookingsReducer,
    upcomingTripsReducer: UpcomingTripsReducer,
    countryListReducer: CountryListReducer,

    searchFlightLocationReducer: SearchFlightLocationReducer,
    searchFlightsReducer: SearchFlightsReducer,
  },
});

export default store;
