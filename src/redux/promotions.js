import * as ActionTypes from './ActionTypes';

export function Promotions(
  state = {
    isLoading: true,
    errMsg: null,
    promotions: []
  },
  action
) {
  switch (action.type) {
    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.PROMOS_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };
    case ActionTypes.ADD_PROMOS:
      return { ...state, isLoading: false, promotions: action.payload };
    default:
      return state;
  }
}
