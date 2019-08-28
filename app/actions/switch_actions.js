import { connect } from 'react-redux';
import * as Actions from '../constants/fetching_action_types';
import { DetailInfoScreen } from '../../screens/DetailInfoScreen';

export const changeSwitchToKelvin = () => ({
  type: Actions.SWITCH_KELVIN
});

export const changeSwitchToCelsius = () => ({
  type: Actions.SWITCH_CELSIUS
});

const mapStateToProps = dispatch => ({
  switchPosition: state.switch_reducer.switchPosition
});

const mapDispatchToProps = dispatch => ({
  switchToCelsius: () => dispatch(changeSwitchToCelsius),
  switchToKelvin: () => dispatch(changeSwitchToKelvin),
});

export default connect(mapStateToProps, mapDispatchToProps)(DetailInfoScreen);
