import {combineReducers} from 'redux';
import user from './user';
import devices from './devices';
const rootReducer = combineReducers({
  user,
  devices,
});

export default rootReducer;
