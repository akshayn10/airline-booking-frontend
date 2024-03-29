import { GET_COUNTRY_LIST } from "../constants/AuthConstants";
import countryList from "../../assets/json/countries.json";

export const getCountryList = () => async (dispatch) => {
  dispatch({
    type: GET_COUNTRY_LIST,
    payload: countryList,
  });
};
