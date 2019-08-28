import * as Actions from '../constants/fetching_action_types';

const initialState = {
  list: [],
  isLoading: false,
  isError: false,
  detailCityInfo: null,
};

const FETCHING_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case Actions.LIST_RESPONSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Actions.LIST_RESPONSE_SUCCESS:
      return {
        ...state,
        list: action.result,
        isLoading: false,
        isError: false,
      };
    case Actions.LIST_RESPONSE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case Actions.CITY_RESPONSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Actions.CITY_RESPONSE_SUCCESS:
      return {
        ...state,
        list: [action.result],
        isLoading: false,
        isError: false,
      };
    case Actions.CITY_RESPONSE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    case Actions.DETAIL_RESPONSE_REQUEST:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case Actions.DETAIL_RESPONSE_SUCCESS:
      return {
        ...state,
        detailCityInfo: action.result,
        isLoading: false,
        isError: false,
      };
    case Actions.DETAIL_RESPONSE_FAIL:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default FETCHING_REDUCER;
