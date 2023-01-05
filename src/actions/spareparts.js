import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler} from '../helpers';
export const SET_SPARE_PARTS = 'SET_SPARE_PARTS';
export const SET_IS_LOADING_SPARE_PARTS = 'SET_IS_LOADING_SPARE_PARTS';

export const setSpareParts = spareparts => dispatch => {
  dispatch({
    type: SET_SPARE_PARTS,
    payload: spareparts,
  });
};

export const setLoadingSpareParts = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_SPARE_PARTS,
    payload: trueOrFalse,
  });
};

export const fetchSpareParts = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingSpareParts(true));
  Axios.get(backendUrl + '/spareparts/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingSpareParts(false));
      dispatch(setSpareParts(res.data.spareparts));
    })
    .catch(error => {
      dispatch(setLoadingSpareParts(false));
      errorHandler(error);
    });
};
