import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler} from '../helpers';
export const SET_USERS = 'SET_USERS';
export const SET_IS_LOADING_USERS = 'SET_IS_LOADING_USERS';
export const ADD_SINGLE_USER = 'ADD_SINGLE_USER';

export const setAddUsers = users => dispatch => {
  dispatch({
    type: SET_USERS,
    payload: users,
  });
};

export const setLoadingUsers = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_USERS,
    payload: trueOrFalse,
  });
};

export const setAddSingleUser = user => dispatch => {
  dispatch({
    type: ADD_SINGLE_USER,
    payload: user,
  });
};

export const fetchUsers = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingUsers(true));
  Axios.get(backendUrl + '/users/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingUsers(false));
      dispatch(setAddUsers(res.data.users));
    })
    .catch(error => {
      dispatch(setLoadingUsers(false));
      errorHandler(error);
    });
};

export const fetchUsersSilent = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingUsers(true));
  Axios.get(backendUrl + '/users/chatt/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingUsers(false));
      dispatch(setAddUsers(res.data.users));
    })
    .catch(error => {
      dispatch(setLoadingUsers(false));
      // errorHandler(error);
    });
};
