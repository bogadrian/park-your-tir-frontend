import updateDeleteCommentTypes from './updateDeleteComment-types';

const INITIAL_STATE = {
  comment: null,
  error: null,
};

const updateDeleteCommentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateDeleteCommentTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        error: null,
      };
    case updateDeleteCommentTypes.DELETE_COMMENT_FAILURE:
    case updateDeleteCommentTypes.UPDATE_COMMENT_FAILURE:
      return {
        ...state,
        comment: null,
        error: action.payload,
      };
    case updateDeleteCommentTypes.UPDATE_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.payload,
        error: null,
      };

    default:
      return state;
  }
};

export default updateDeleteCommentReducer;
