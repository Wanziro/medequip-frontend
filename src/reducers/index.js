import {combineReducers} from 'redux';
import user from './user';
import devices from './devices';
import troubleShootingCategories from './troubleShootingCategories';
const rootReducer = combineReducers({
  user,
  devices,
  troubleShootingCategories,
});

export default rootReducer;
