import { isAuthenticated } from "../../util/AuthUtils";
import {
  ADD_CONTACT_DETAILS_FAILURE,
  ADD_CONTACT_DETAILS_SUCCESS,
  AUTHENTICATED,
  CHANGE_PASSWORD_FAILURE,
  CHANGE_PASSWORD_SUCCESS,
  EMAIL_CONFIRMATION_FAILURE,
  EMAIL_CONFIRMATION_SUCCESS,
  FORGOT_PASSWORD_CONFIRMATION_FAILURE,
  FORGOT_PASSWORD_CONFIRMATION_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  FORGOT_PASSWORD_SUCCESS,
  GET_COUNTRY_LIST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  REFRESH_TOKEN,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET_LOGIN_STATE,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
} from "../constants/AuthConstants";
const countryListState = {
  isLoading: false,
  countryList: [],
};
const loginResponseState = {
  status: null,
  data: null,
  message: null,
};
const registerResponseState = {
  status: null,
  data: null,
  message: null,
};
const confirmEmailResponseState = {
  status: null,
  data: null,
  message: null,
};
const addContactDetailsResponseState = {
  status: null,
  data: null,
  message: null,
};
const forgotPasswordResponseState = {
  status: null,
  data: null,
  message: null,
};
const forgotPasswordConfirmationResponseState = {
  status: null,
  data: null,
  message: null,
};
const changePasswordResponseState = {
  status: null,
  data: null,
  message: null,
};
const resetPasswordResponseState = {
  status: null,
  data: null,
  message: null,
}
const AuthenticationState = {
  authenticated: isAuthenticated(),
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  role: localStorage.getItem("role") || null,
};

export const CountryListReducer = (state = countryListState, action) => {
  switch (action.type) {
    case GET_COUNTRY_LIST:
      return {
        ...state,
        isLoading: true,
        countryList: action.payload,
      };
    default:
      return state;
  }
};
export const AuthenticationStateReducer = (
  state = AuthenticationState,
  action
) => {
  console.log(AuthenticationState,"Auth");
  switch (action.type) {
    case AUTHENTICATED:
      return {
        ...state,
        authenticated: action.authenticated,
        accessToken: action.accessToken,
        refreshToken: action.refreshToken,
        user: action.user,
        role: action.role,
      };
    case REFRESH_TOKEN:
      return {
        ...state,
        accessToken: action.accessToken,
      }

    default:
      return state;
      
  }
  

};
export const LoginResponseReducer = (state = loginResponseState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    case RESET_LOGIN_STATE:
      return {
        ...state,
        status: null,
        message: null,
        data: null,
      };
    default:
      return state;
  }
};
export const RegisterResponseReducer = (state = registerResponseState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};

export const ConfirmEmailResponseReducer = (state = confirmEmailResponseState, action) => {
  switch (action.type) {
    case EMAIL_CONFIRMATION_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case EMAIL_CONFIRMATION_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};


export const AddContactDetailsResponseReducer = (state = addContactDetailsResponseState, action) => {
  switch (action.type) {
    case ADD_CONTACT_DETAILS_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case ADD_CONTACT_DETAILS_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};


export const ForgotPasswordResponseReducer = (state = forgotPasswordResponseState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};

export const ForgotPasswordConfirmationResponseReducer = (state = forgotPasswordConfirmationResponseState, action) => {
  switch (action.type) {
    case FORGOT_PASSWORD_CONFIRMATION_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case FORGOT_PASSWORD_CONFIRMATION_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};

export const ResetPasswordResponseReducer = (state = resetPasswordResponseState, action) => {
  switch (action.type) {
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};

export const ChangePasswordResponseReducer = (state = changePasswordResponseState, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: action.data,
      };
    case CHANGE_PASSWORD_FAILURE:
      return {
        ...state,
        status: action.status,
        message: action.message,
        data: null,
      };
    default:
      return state;
  }
};
