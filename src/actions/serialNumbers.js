import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler} from '../helpers';
export const SET_SERIAL_NUMBERS = 'SET_SERIAL_NUMBERS';
export const SET_IS_LOADING_SERIAL_NUMBERS = 'SET_IS_LOADING_SERIAL_NUMBERS';

export const setSerialNumbers = SerialNumbers => dispatch => {
  dispatch({
    type: SET_SERIAL_NUMBERS,
    payload: SerialNumbers,
  });
};

export const setLoadingSerialNumbers = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_SERIAL_NUMBERS,
    payload: trueOrFalse,
  });
};

export const fetchSerialNumbers = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingSerialNumbers(true));
  Axios.get(backendUrl + '/serialnumbers/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingSerialNumbers(false));
      dispatch(setSerialNumbers(res.data.serialNumbers));
    })
    .catch(error => {
      dispatch(setLoadingSerialNumbers(false));
      errorHandler(error);
    });
};

export const fetchSerialNumbersSilent = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingSerialNumbers(true));
  Axios.get(backendUrl + '/serialnumbers/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingSerialNumbers(false));
      dispatch(setSerialNumbers(res.data.serialNumbers));
    })
    .catch(error => {
      dispatch(setLoadingSerialNumbers(false));
      //   errorHandler(error);
    });
};
