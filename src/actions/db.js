import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler, handleAuthError} from '../helpers';
export const SET_DB = 'SET_DB';
export const SET_IS_LOADING_DB = 'SET_IS_LOADING_DB';
export const SET_LOADING_DB_ERROR = 'SET_LOADING_DB_ERROR';

export const setDB = db => dispatch => {
  dispatch({
    type: SET_DB,
    payload: db,
  });
};

export const setLoadingDB = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_DB,
    payload: trueOrFalse,
  });
};

export const setLoadingDBError = error => dispatch => {
  dispatch({
    type: SET_LOADING_DB_ERROR,
    payload: error,
  });
};

export const fetchDB = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingDB(true));
  dispatch(setLoadingDBError(''));
  Axios.get(backendUrl + '/search/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingDB(false));
      dispatch(setDB(res.data.db));
    })
    .catch(error => {
      dispatch(setLoadingDB(false));
      dispatch(setLoadingDBError(error.message));
      handleAuthError(error);
    });
};
