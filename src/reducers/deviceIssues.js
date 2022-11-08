import {
  SET_DEVICE_ISSUES,
  SET_IS_LOADING_DEVICE_ISSUES,
  ADD_SINGLE_DEVICE_ISSUE,
} from '../actions/deviceIssues';

const initialState = {
  issues: [],
  isLoading: false,
};

const devices = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEVICE_ISSUES:
      return {...state, issues: action.payload};
    case ADD_SINGLE_DEVICE_ISSUE:
      return {...state, issues: [...state.issues, action.payload]};
    case SET_IS_LOADING_DEVICE_ISSUES:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default devices;
