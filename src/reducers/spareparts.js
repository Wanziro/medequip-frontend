import {
  SET_SPARE_PARTS,
  SET_IS_LOADING_SPARE_PARTS,
} from '../actions/spareparts';

const initialState = {
  spareparts: [],
  isLoading: false,
};

const spareparts = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPARE_PARTS:
      return {...state, spareparts: action.payload};
    case SET_IS_LOADING_SPARE_PARTS:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default spareparts;
