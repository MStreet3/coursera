import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';
import rp from 'request-promise';

// actions for dishes
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

// actions for comments
export function fetchComments() {
  return async function(dispatch) {
    let response = await rp({
      uri: baseUrl + 'comments',
      method: 'GET',
      json: true,
      resolveWithFullResponse: true
    });
    return dispatch(addComments(response.body));
  };
}

export function addComments(comments) {
  return {
    type: ActionTypes.ADD_COMMENTS,
    payload: comments
  };
}

export function commentsFailed(errMsg) {
  return {
    type: ActionTypes.COMMENTS_FAILED,
    payload: errMsg
  };
}

export function addComment(comment) {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: comment
  };
}

export function postComment(dishId, rating, author, comment) {
  return async function(dispatch) {
    let response = await rp({
      uri: baseUrl + 'comments',
      method: 'POST',
      body: {
        dishId: dishId,
        rating: rating,
        author: author,
        comment: comment,
        date: new Date().toISOString()
      },
      json: true
    });
    dispatch(addComment(response.body));
    return dispatch(fetchComments());
  };
}

// actions for promotions
export function fetchPromos() {
  return async function(dispatch) {
    dispatch(promosLoading());
    let response = await rp({
      uri: baseUrl + 'promotions',
      method: 'GET',
      json: true,
      resolveWithFullResponse: true
    });
    console.log(response.body);
    return dispatch(addPromos(response.body));
  };
}

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
  payload: true
});

export const promosFailed = (errmess) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errmess
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos
});

// actions for leaders
export function fetchLeaders() {
  return async function(dispatch) {
    dispatch(leadersLoading());
    let response = await rp({
      uri: baseUrl + 'leaders',
      method: 'GET',
      json: true,
      resolveWithFullResponse: true
    });
    if (response.statusCode === 200) {
      return dispatch(addLeaders(response.body));
    } else {
      return dispatch(
        leadersFailed(
          `Fetch of leaders failed with ${
            response.statusCode
          } status code and the following message: ${response.statusMessage}`
        )
      );
    }
  };
}

export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
  payload: true
});

export const leadersFailed = (errmess) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errmess
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders
});

// actions to handle feedback
export function postFeedback(values) {
  return async function(dispatch) {
    dispatch(addFeedback());
    let response = await rp({
      uri: baseUrl + 'feedback',
      method: 'POST',
      json: true,
      body: values,
      resolveWithFullResponse: true
    });
    if (response.statusCode === 201) {
      console.log('Posted feedback to the server');
      return dispatch(feedbackSuccess());
    } else {
      dispatch(feedbackFailed(response.statusMessage));
      throw new Error(response.statusMessage);
    }
  };
}

export const addFeedback = () => ({
  type: ActionTypes.ADD_FEEDBACK,
  payload: true
});

export const feedbackFailed = (errMsg) => ({
  type: ActionTypes.FEEDBACK_FAILED,
  payload: errMsg
});

export const feedbackSuccess = () => ({
  type: ActionTypes.FEEDBACK_SUCCESS,
  payload: ''
});
