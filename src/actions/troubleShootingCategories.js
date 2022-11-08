import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler} from '../helpers';
export const SET_TROUBLE_SHOOTING_CATEGORIES =
  'SET_TROUBLE_SHOOTING_CATEGORIES';
export const SET_IS_LOADING_TROUBLE_SHOOTING_CATEGORIES =
  'SET_IS_LOADING_TROUBLE_SHOOTING_CATEGORIES';
export const ADD_SINGLE_TROUBLE_SHOOTING_CATEGORY =
  'ADD_SINGLE_TROUBLE_SHOOTING_CATEGORY';

export const setAddTroubleShootingCategories = categories => dispatch => {
  dispatch({
    type: SET_TROUBLE_SHOOTING_CATEGORIES,
    payload: categories,
  });
};

export const setLoadingTroubleShootingCategories = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_TROUBLE_SHOOTING_CATEGORIES,
    payload: trueOrFalse,
  });
};

export const setAddSingleTroubleShootingCategory = category => dispatch => {
  dispatch({
    type: ADD_SINGLE_TROUBLE_SHOOTING_CATEGORY,
    payload: category,
  });
};

export const fetchTroubleshootingcategories = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingTroubleShootingCategories(true));
  Axios.get(backendUrl + '/troubleshootingCategories/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingTroubleShootingCategories(false));
      dispatch(
        setAddTroubleShootingCategories(res.data.troubleShootingCategories),
      );
    })
    .catch(error => {
      dispatch(setLoadingTroubleShootingCategories(false));
      errorHandler(error);
    });
};
