export const SET_USER_NAMES = 'SET_USER_NAMES';
export const SET_USER_EMAIL = 'SET_USER_EMAIL';
export const SET_USER_TOKEN = 'SET_USER_TOKEN';
export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_USER_ID = 'SET_USER_ID';
export const SET_USER_COMPANY_NAME = 'SET_USER_COMPANY_NAME';
export const RESET_USER = 'RESET_USER';

export const setUserNames = names => dispatch => {
  dispatch({
    type: SET_USER_NAMES,
    payload: names,
  });
};
export const setUserEmail = value => dispatch => {
  dispatch({
    type: SET_USER_EMAIL,
    payload: value,
  });
};
export const setUserToken = value => dispatch => {
  dispatch({
    type: SET_USER_TOKEN,
    payload: value,
  });
};
export const setUserRole = value => dispatch => {
  dispatch({
    type: SET_USER_ROLE,
    payload: value,
  });
};

export const setUserCompanyName = value => dispatch => {
  dispatch({
    type: SET_USER_COMPANY_NAME,
    payload: value,
  });
};

export const setUserId = id => dispatch => {
  dispatch({
    type: SET_USER_ID,
    payload: id,
  });
};

export const resetUser = () => ({type: RESET_USER});
