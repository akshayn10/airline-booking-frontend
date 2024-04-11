import {
  GET_COUNTRY_LIST,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  RESET_LOGIN_STATE,
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
