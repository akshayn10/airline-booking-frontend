import { GET_COUNTRY_LIST } from "../constants/AuthConstants";

const countryListState = {
    isLoading:false,
    countryList :[]
}


export const CountryListReducer = (state = countryListState, action) => {
    switch (action.type) {
        case GET_COUNTRY_LIST:
            return {
                ...state,
                isLoading:true,
                countryList:action.payload
            }
        default:
            return state
    }   
}