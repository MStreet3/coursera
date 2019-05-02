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
      return { ...state, comments: [...state.comments, action.payload] };
    default:
      return state;
  }
}
