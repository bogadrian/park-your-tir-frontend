import updateDeleteCommentTypes from './updateDeleteComment-types';

export const startDeleteComment = data => ({
  type: updateDeleteCommentTypes.START_DELETE_COMMENT,
  payload: data
});

export const deleteCommentSuccess = response => ({
  type: updateDeleteCommentTypes.DELETE_COMMENT_SUCCESS,
  payload: response
});

export const deleteCommentFailure = error => ({
  type: updateDeleteCommentTypes.DELETE_COMMENT_FAILURE,
  payload: error
});

export const startUpdateComment = data => ({
  type: updateDeleteCommentTypes.START_UPDATE_COMMENT,
  payload: data
});

export const updateCommentSuccess = comment => ({
  type: updateDeleteCommentTypes.UPDATE_COMMENT_SUCCESS,
  payload: comment
});

export const updateCommentFailure = error => ({
  type: updateDeleteCommentTypes.UPDATE_COMMENT_FAILURE,
  payload: error
});

export const updateLastCommentSuccess = comment => ({
  type: updateDeleteCommentTypes.UPDATE_COMMENT_SUCCESS,
  payload: comment
});

export const updateLastCommentFailure = error => ({
  type: updateDeleteCommentTypes.UPDATE_COMMENT_FAILURE,
  payload: error
});
