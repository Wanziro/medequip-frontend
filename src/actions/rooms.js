export const SET_MESSAGE_CHAT_ROOMS = 'SET_MESSAGE_CHAT_ROOMS';

function compare(a, b) {
  if (a.index > b.index) {
    return -1;
  }
  if (a.index < b.index) {
    return 1;
  }
  return 0;
}

export const setChattRooms = msgs => dispatch => {
  dispatch({
    type: SET_MESSAGE_CHAT_ROOMS,
    payload: msgs,
  });
};

export const organiseChattRooms = () => (dispatch, getState) => {
  const {messages} = getState();
  const rms = messages.messages.sort(compare);
  for (let i = 0; i < rms.length; i++) {
    for (let j = i + 1; j < rms.length; j++) {
      if (
        (rms[i].from?._id == rms[j].from?._id &&
          rms[i].to?._id == rms[j].to?._id) ||
        (rms[i].from?._id == rms[j].to?._id &&
          rms[i].to?._id == rms[j].from?._id)
      ) {
        rms.splice(j--, 1);
      }
    }
  }
  dispatch(setChattRooms(rms));
};
