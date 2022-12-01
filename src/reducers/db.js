import {SET_DB, SET_IS_LOADING_DB, SET_LOADING_DB_ERROR} from '../actions/db';

const initialState = {
  db: [],
  isLoading: false,
  loadingDbError: '',
};

const db = (state = initialState, action) => {
  switch (action.type) {
    case SET_DB:
      return {...state, db: action.payload};
    case SET_LOADING_DB_ERROR:
      return {...state, loadingDbError: action.payload};
    case SET_IS_LOADING_DB:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default db;
