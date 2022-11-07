import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler} from '../helpers';
export const SET_DEVICES = 'SET_DEVICES';
export const SET_IS_LOADING_DEVICES = 'SET_IS_LOADING_DEVICES';
export const ADD_SINGLE_DEVICE = 'ADD_SINGLE_DEVICE';

export const setAddDevices = devices => dispatch => {
  dispatch({
    type: SET_DEVICES,
    payload: devices,
  });
};

export const setLoadingDevices = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_DEVICES,
    payload: trueOrFalse,
  });
};

export const setAddSingleDevice = device => dispatch => {
  dispatch({
    type: ADD_SINGLE_DEVICE,
    payload: device,
  });
};

export const fetchDevices = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingDevices(true));
  Axios.get(backendUrl + '/devices/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingDevices(false));
      dispatch(setAddDevices(res.data.devices));
    })
    .catch(error => {
      dispatch(setLoadingDevices(false));
      errorHandler(error);
    });
};
