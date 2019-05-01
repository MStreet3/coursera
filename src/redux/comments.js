import * as ActionTypes from './ActionTypes';

export function Comments(
  state = {
    comments: [],
    errMsg: null
  },
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, isLoading: false, comments: action.payload };
    case ActionTypes.COMMENTS_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };
    case ActionTypes.ADD_COMMENT:
      let comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      return { ...state, comments: [...state.comments, comment] };
    default:
      return state;
  }
}
