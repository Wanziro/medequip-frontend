import {
  SET_USER_NAMES,
  SET_USER_EMAIL,
  SET_USER_TOKEN,
  SET_USER_ROLE,
  SET_USER_ID,
  SET_USER_COMPANY_NAME,
  RESET_USER,
  SET_SELECTED_DEVICE,
} from '../actions/user';

const initialState = {
  id: '',
  token: '',
  password: '',
  fullName: '',
  email: '',
  role: '',
  companyName: '',
  selectedDevice: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_NAMES:
      return {...state, fullName: action.payload};
    case SET_USER_ID:
      return {...state, id: action.payload};
    case SET_USER_EMAIL:
      return {...state, email: action.payload};
    case SET_USER_ROLE:
      return {...state, role: action.payload};
    case SET_USER_TOKEN:
      return {...state, token: action.payload};
    case SET_USER_COMPANY_NAME:
      return {...state, companyName: action.payload};
    case SET_SELECTED_DEVICE:
      return {...state, selectedDevice: action.payload};
    case RESET_USER:
      return initialState;
    default:
      return state;
  }
};

export default user;
