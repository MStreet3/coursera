import * as ActionTypes from './ActionTypes';
import { DISHES } from '../shared/dishes';

export function addComment(dishId, rating, author, comment) {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment
    }
  };
}

export function fetchDishes() {
  return function(dispatch) {
    dispatch(dishesLoading(true));
    setTimeout(() => {
      return dispatch(addDishes(DISHES));
    }, 1500);
  };
}

export function dishesLoading(status) {
  return {
    type: ActionTypes.DISHES_LOADING,
    payload: status
  };
}

export function addDishes(dishes) {
  return {
    type: ActionTypes.ADD_DISHES,
    payload: dishes
  };
}

export function dishesFailed(errMsg) {
  return {
    type: ActionTypes.DISHES_FAILED,
    payload: errMsg
  };
}
