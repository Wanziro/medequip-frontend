export const SET_ISSUE_KEYWORD = 'SET_ISSUE_KEYWORD';

export const setIssueKeyWord = keyword => dispatch => {
  dispatch({
    type: SET_ISSUE_KEYWORD,
    payload: keyword,
  });
};
