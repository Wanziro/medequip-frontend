import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler} from '../helpers';
export const SET_DEVICE_ISSUES = 'SET_DEVICE_ISSUES';
export const SET_IS_LOADING_DEVICE_ISSUES = 'SET_IS_LOADING_DEVICE_ISSUES';
export const ADD_SINGLE_DEVICE_ISSUE = 'ADD_SINGLE_DEVICE_ISSUE';

export const setAddDeviceIssues = issues => dispatch => {
  dispatch({
    type: SET_DEVICE_ISSUES,
    payload: issues,
  });
};

export const setLoadingDeviceIssues = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_DEVICE_ISSUES,
    payload: trueOrFalse,
  });
};

export const setAddSingleDeviceIssue = device => dispatch => {
  dispatch({
    type: ADD_SINGLE_DEVICE_ISSUE,
    payload: device,
  });
};

export const fetchDeviceIssues = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingDeviceIssues(true));
  Axios.get(backendUrl + '/deviceissues/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingDeviceIssues(false));
      dispatch(setAddDeviceIssues(res.data.issues));
    })
    .catch(error => {
      dispatch(setLoadingDeviceIssues(false));
      errorHandler(error);
    });
};
