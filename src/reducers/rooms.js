import {SET_MESSAGE_CHAT_ROOMS} from '../actions/rooms';

const initialState = {
  chattRooms: [],
};

const rooms = (state = initialState, action) => {
  switch (action.type) {
    case SET_MESSAGE_CHAT_ROOMS:
      return {chattRooms: action.payload};

    default:
      return state;
  }
};

export default rooms;
