import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import rp from 'request-promise';

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
  return async function(dispatch) {
    dispatch(dishesLoading(true));
    let response = await rp({
      uri: baseUrl + 'dishes',
      method: 'GET',
      json: true,
      resolveWithFullResponse: true
    });
    return dispatch(addDishes(response.body));
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
