import {
  SET_USERS,
  SET_IS_LOADING_USERS,
  ADD_SINGLE_USER,
} from '../actions/appUsers';

const initialState = {
  users: [],
  isLoading: false,
};

const appUsers = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return {...state, users: action.payload};
    case ADD_SINGLE_USER:
      return {...state, users: [...state.users, action.payload]};
    case SET_IS_LOADING_USERS:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default appUsers;
