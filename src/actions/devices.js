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
