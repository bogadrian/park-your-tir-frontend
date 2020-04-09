import getCommentsTypes from './getComments-types';
import setCommentTypes from '../setComment/setComment-types';
import updateDeleteCommentTypes from '../updateDeleteCommentReducer/updateDeleteComment-types';

const INITIAL_STATE = {
  comments: null,
  error: null
};

const getCommentsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case getCommentsTypes.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: null
      };
    case getCommentsTypes.GET_COMMENTS_FAILURE:
      return {
        ...state,
        comments: [],
        error: action.payload
      };
    case setCommentTypes.GET_LAST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: null
      };
    case updateDeleteCommentTypes.UPDATE_LAST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: action.payload,
        error: null
      };
    case updateDeleteCommentTypes.UPDATE_LAST_COMMENT_FAILURE:
      return {
        ...state,
        comments: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default getCommentsReducer;
