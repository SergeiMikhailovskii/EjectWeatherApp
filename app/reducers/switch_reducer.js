import * as Actions from '../constants/switch_action_types';

const initialState = {
  switchPosition: 0
};

const SWITCH_REDUCER = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SWITCH_CELSIUS:
      return Object.assign({}, state, {
        switchPosition: 0
      });
    case Actions.SWITCH_KELVIN:
      return Object.assign({}, state, {
        switchPosition: 1
      });
    default:
      return state;
  }
};

export default SWITCH_REDUCER;
