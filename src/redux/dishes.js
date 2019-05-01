import * as ActionTypes from './ActionTypes';

export function Dishes(
  // Reducer responsible for the dishes state
  state = {
    isLoading: true,
    dishes: [],
    errMsg: null
  },
  action
) {
  switch (action.type) {
    case ActionTypes.DISHES_LOADING:
      return { ...state, isLoading: action.payload };

    case ActionTypes.ADD_DISHES:
      return { ...state, isLoading: false, dishes: action.payload };

    case ActionTypes.DISHES_FAILED:
      return { ...state, isLoading: false, errMsg: action.payload };

    default:
      return state;
  }
}
