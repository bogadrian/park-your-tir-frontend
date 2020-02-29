import ressetPasswordTypes from './ressetPassword-types';

const INITIAL_STATE = {
  email: null,
  error: null
};

const ressetPasswordReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ressetPasswordTypes.RESSET_SUCCESS:
      return {
        ...state,
        email: action.payload,
        error: null
      };
    case ressetPasswordTypes.RESSET_FAILURE:
      return {
        ...state,
        email: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default ressetPasswordReducer;
