import {
  SET_DEVICES,
  SET_IS_LOADING_DEVICES,
  ADD_SINGLE_DEVICE,
} from '../actions/devices';

const initialState = {
  devices: [],
  isLoading: false,
};

const devices = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICES:
      return {...state, devices: action.payload};
    case ADD_SINGLE_DEVICE:
      return {...state, devices: [...state.devices, action.payload]};
    case SET_IS_LOADING_DEVICES:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default devices;
