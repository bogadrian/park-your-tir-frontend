import setCommentTypes from './setComment-types';

export const startComment = data => ({
  type: setCommentTypes.START_COMMENT,
  payload: data
});

export const commentSuccess = comment => ({
  type: setCommentTypes.COMMENT_SUCCESS,
  payload: comment
});

export const commentFailure = error => ({
  type: setCommentTypes.COMMENT_FAILURE,
  payload: error
});

export const startCommentRating = rating => ({
  type: setCommentTypes.START_COMMENT_RATING,
  payload: rating
});

export const commentRating = rating => ({
  type: setCommentTypes.COMMENT_RATING_SUCCESS,
  payload: rating
});
export const getLastCommentInCommentsFailure = error => ({
  type: setCommentTypes.GET_LAST_COMMENT_FAILURE,
  payload: error
});

export const getLastCommentInCommentsSuccess = comment => {
 
  return {
    type: setCommentTypes.GET_LAST_COMMENT_SUCCESS,
    payload: comment
  };
};

export const getLastCommentStart = comment => {
  
  return {
    type: setCommentTypes.GET_LAST_COMMENT_START,
    payload: comment
  };
};
