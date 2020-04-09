import setCommentTypes from './setComment-types';

const INITIAL_STATE = {
  comment: null,
  rating: 0,
  error: null
};

const commentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case setCommentTypes.COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        error: null
      };
    case setCommentTypes.COMMENT_FAILURE:
      return {
        ...state,
        comment: null,
        error: action.payload
      };
    case setCommentTypes.START_COMMENT_RATING:
      return {
        ...state,
        comment: null,
        rating: action.payload,
        error: null
      };
    case setCommentTypes.GET_LAST_COMMENT_FAILURE:
      return {
        ...state,
        comments: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default commentReducer;
