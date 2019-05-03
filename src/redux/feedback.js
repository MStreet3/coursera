import * as ActionTypes from './ActionTypes';

export function Feedback(
  state = {
    isPosting: false,
    errMsg: null
  },
  action
) {
  switch (action.type) {
    case ActionTypes.ADD_FEEDBACK:
      return { ...state, isPosting: action.payload };
    case ActionTypes.FEEDBACK_FAILED:
      return { ...state, isPosting: false, errMsg: action.payload };
    case ActionTypes.FEEDBACK_SUCCESS:
      return { ...state, isPosting: false, errMsg: null };
    default:
      return state;
  }
}
