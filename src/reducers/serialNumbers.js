import {
  SET_SERIAL_NUMBERS,
  SET_IS_LOADING_SERIAL_NUMBERS,
} from '../actions/serialNumbers';

const initialState = {
  serialNumbers: [],
  isLoading: false,
};

const spareparts = (state = initialState, action) => {
  switch (action.type) {
    case SET_SERIAL_NUMBERS:
      return {...state, serialNumbers: action.payload};
    case SET_IS_LOADING_SERIAL_NUMBERS:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default spareparts;
