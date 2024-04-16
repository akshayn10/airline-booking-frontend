import { configureStore } from "@reduxjs/toolkit";
import {
  AdminFleetReducer,
  AdminFlightLocationReducer,
  AdminFlightsReducer,
  ApiErrorReducer,
} from "./reducers/AdminReducer";
import {
  CancelBookingResponseReducer,
  GetUserByEmailReducer,
  PastBookingsResponseReducer,
  UpcomingTripsResponseReducer,
  UpdateUserReducer,
} from "./reducers/UserReducer";
import {
  AddContactDetailsResponseReducer,
  AuthenticationStateReducer,
  ChangePasswordResponseReducer,
  ConfirmEmailResponseReducer,
  CountryListReducer,
  ForgotPasswordConfirmationResponseReducer,
  ForgotPasswordResponseReducer,
  LoginResponseReducer,
  RegisterResponseReducer,
  ResetPasswordResponseReducer,
} from "./reducers/AuthReducer";

const store = configureStore({
  reducer: {
    apiErrorReducer: ApiErrorReducer,
    flightLocationsReducer: AdminFlightLocationReducer,
    fleetsReducer: AdminFleetReducer,
    flightsReducer: AdminFlightsReducer,
    
    pastBookingsResponseReducer: PastBookingsResponseReducer,
    upcomingTripsResponseReducer: UpcomingTripsResponseReducer,
    countryListReducer: CountryListReducer,

    loginResponseReducer: LoginResponseReducer,
    authenticationStateReducer: AuthenticationStateReducer,
    registerResponseReducer: RegisterResponseReducer,
    confirmEmailResponseReducer: ConfirmEmailResponseReducer,
    addContactDetailsResponseReducer: AddContactDetailsResponseReducer,
    forgotPasswordResponseReducer: ForgotPasswordResponseReducer,
    forgotPasswordConfirmationResponseReducer:ForgotPasswordConfirmationResponseReducer,
    resetPasswordResponseReducer:ResetPasswordResponseReducer,
    changePasswordResponseReducer:ChangePasswordResponseReducer,

    updateUserReducer:UpdateUserReducer,
    getUserByEmailReducer:GetUserByEmailReducer,
    cancelBookingResponseReducer:CancelBookingResponseReducer,


  },
});

export default store;
