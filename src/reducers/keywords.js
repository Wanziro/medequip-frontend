import {SET_ISSUE_KEYWORD} from '../actions/keywords';

const initialState = {
  issueKeyword: '',
};

const keywords = (state = initialState, action) => {
  switch (action.type) {
    case SET_ISSUE_KEYWORD:
      return {...state, issueKeyword: action.payload};
    default:
      return state;
  }
};

export default keywords;
