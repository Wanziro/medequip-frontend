import {combineReducers} from 'redux';
import user from './user';
import devices from './devices';
import troubleShootingCategories from './troubleShootingCategories';
import deviceIssues from './deviceIssues';
import appUsers from './appUsers';
import db from './db';
import keywords from './keywords';
const rootReducer = combineReducers({
  user,
  devices,
  troubleShootingCategories,
  deviceIssues,
  appUsers,
  db,
  keywords,
});

export default rootReducer;
