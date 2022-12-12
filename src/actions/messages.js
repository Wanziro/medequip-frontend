import Axios from 'axios';
import {backendUrl} from '../constants/app';
import {errorHandler, handleAuthError} from '../helpers';
export const SET_MESSAGES = 'SET_MESSAGES';
export const SET_IS_LOADING_MESSAGES = 'SET_IS_LOADING_MESSAGES';
export const SET_LOADING_MESSAGES_ERROR = 'SET_LOADING_MESSAGES_ERROR';

export const setMessages = messages => dispatch => {
  dispatch({
    type: SET_MESSAGES,
    payload: messages,
  });
};

export const setLoadingMessages = trueOrFalse => dispatch => {
  dispatch({
    type: SET_IS_LOADING_MESSAGES,
    payload: trueOrFalse,
  });
};

export const setLoadingMessagesError = error => dispatch => {
  dispatch({
    type: SET_LOADING_MESSAGES_ERROR,
    payload: error,
  });
};

export const fetchMessages = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingMessages(true));
  dispatch(setLoadingMessagesError(''));
  Axios.get(backendUrl + '/messages/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingMessages(false));
      dispatch(setMessages(res.data.messages));
    })
    .catch(error => {
      dispatch(setLoadingMessages(false));
      dispatch(setLoadingMessagesError(error.message));
      errorHandler(error);
    });
};

export const silentFetchMessages = () => (dispatch, getState) => {
  const {user} = getState();
  dispatch(setLoadingMessages(true));
  dispatch(setLoadingMessagesError(''));
  Axios.get(backendUrl + '/messages/?token=' + user.token)
    .then(res => {
      dispatch(setLoadingMessages(false));
      dispatch(setMessages(res.data.messages));
    })
    .catch(error => {
      dispatch(setLoadingMessages(false));
      dispatch(setLoadingMessagesError(error.message));
      handleAuthError(error);
    });
};
