import { combineReducers } from 'redux';
import fetchingReducer from './fetching_reducer';
import switchReducer from './switch_reducer';

const APP_REDUCERS = combineReducers({
  fetchingReducer, switchReducer,
});

export default APP_REDUCERS;
