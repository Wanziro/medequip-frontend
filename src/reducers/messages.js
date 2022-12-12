import {
  SET_MESSAGES,
  SET_LOADING_MESSAGES_ERROR,
  SET_IS_LOADING_MESSAGES,
} from '../actions/messages';

const initialState = {
  messages: [],
  chattRooms: [],
  isLoading: false,
  loadingMessagesError: '',
};

const messages = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGES:
      return {...state, messages: action.payload};
    case SET_LOADING_MESSAGES_ERROR:
      return {...state, loadingMessagesError: action.payload};
    case SET_IS_LOADING_MESSAGES:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default messages;
