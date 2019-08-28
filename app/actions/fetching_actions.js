import * as Actions from '../constants/fetching_action_types';

function fetchListOfCities() {
  return fetch(`${Actions.BASE_URL}/data/2.5/find?lat=53.9&lon=27.6&cnt=10&appid=8df903ce56f6d18245e72f380beb297d`);
}

export const listOfCitiesRequest = () => function (dispatch) {
  return fetchListOfCities()
    .then(dispatch({ type: Actions.LIST_RESPONSE_REQUEST }))
    .then(list => list.json())
    .then(list => list.list)
    .then((list) => {
      dispatch(getListOfCities(list));
    })
    .catch((error) => {
      dispatch({ type: Actions.LIST_RESPONSE_FAIL });
      console.log(error);
    });
};

export const getListOfCities = result => ({
  type: Actions.LIST_RESPONSE_SUCCESS,
  result,
});

function fetchCityFromSearch(city) {
  return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&apikey=8df903ce56f6d18245e72f380beb297d`);
}

export const searchCityRequest = cityName => function (dispatch) {
  return fetchCityFromSearch(cityName)
    .then(dispatch({ type: Actions.CITY_RESPONSE_REQUEST }))
    .then(city => city.json())
    .then((city) => {
      dispatch(getCityFromSearch(city));
    })
    .catch((error) => {
      dispatch({ type: Actions.CITY_RESPONSE_FAIL });
      console.log(error);
    });
};

export const getCityFromSearch = result => ({
  type: Actions.CITY_RESPONSE_SUCCESS,
  result,
});

function fetchDetailInfo(city) {
  const query = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&apikey=8df903ce56f6d18245e72f380beb297d`;
  return fetch(query);
}

export const detailInfoRequest = cityName => function (dispatch) {
  return fetchDetailInfo(cityName)
    .then(dispatch({ type: Actions.DETAIL_RESPONSE_REQUEST }))
    .then(detailInfo => detailInfo.json())
    .then((detailInfo) => {
      dispatch(getDetailInfo(detailInfo));
    })
    .catch((error) => {
      dispatch({ type: Actions.DETAIL_RESPONSE_FAIL });
      console.log(error);
    });
};

export const getDetailInfo = result => ({
  type: Actions.DETAIL_RESPONSE_SUCCESS,
  result
});
