import {
  SET_TROUBLE_SHOOTING_CATEGORIES,
  SET_IS_LOADING_TROUBLE_SHOOTING_CATEGORIES,
  ADD_SINGLE_TROUBLE_SHOOTING_CATEGORY,
} from '../actions/troubleShootingCategories';

const initialState = {
  categories: [],
  isLoading: false,
};

const troubleShootingCategories = (state = initialState, action) => {
  switch (action.type) {
    case SET_TROUBLE_SHOOTING_CATEGORIES:
      return {...state, categories: action.payload};
    case ADD_SINGLE_TROUBLE_SHOOTING_CATEGORY:
      return {...state, categories: [...state.categories, action.payload]};
    case SET_IS_LOADING_TROUBLE_SHOOTING_CATEGORIES:
      return {...state, isLoading: action.payload};
    default:
      return state;
  }
};

export default troubleShootingCategories;
