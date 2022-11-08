import {combineReducers} from 'redux';
import user from './user';
import devices from './devices';
import troubleShootingCategories from './troubleShootingCategories';
import deviceIssues from './deviceIssues';
const rootReducer = combineReducers({
  user,
  devices,
  troubleShootingCategories,
  deviceIssues,
});

export default rootReducer;
