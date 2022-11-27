import {combineReducers} from 'redux';
import user from './user';
import devices from './devices';
import troubleShootingCategories from './troubleShootingCategories';
import deviceIssues from './deviceIssues';
import appUsers from './appUsers';
const rootReducer = combineReducers({
  user,
  devices,
  troubleShootingCategories,
  deviceIssues,
  appUsers,
});

export default rootReducer;
