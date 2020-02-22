import getCommentsTypes from './getComments-types';

export const getCommentsStart = placeId => ({
  type: getCommentsTypes.GET_COMMENTS_START,
  payload: placeId
});

export const getCommentsSuccess = comments => ({
  type: getCommentsTypes.GET_COMMENTS_SUCCESS,
  payload: comments
});

export const getCommentsFailure = error => ({
  type: getCommentsTypes.GET_COMMENTS_FAILURE,
  payload: error
});
