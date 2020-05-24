import userActionTypes from './user-types';

const INITIAL_STATE = {
  currentUser: null,
  error: null
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userActionTypes.SET_CURRENT_USER_SUCCESS_SIGNUP:
    case userActionTypes.SET_CURRENT_USER_SUCCESS_LOGIN:
    case userActionTypes.SET_CURRENT_USER_SUCCESS_UPLOAD:
      return {
        ...state,
        currentUser: action.payload,
        error: null
      };
    case userActionTypes.SET_CHANGE_ENBALED_SUCCESS:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          data: {
            ...state.currentUser.data,
            user: {
              ...state.currentUser.data.user,
              enabled: action.payload
            }
          }
        }
      };
    case userActionTypes.SIGNOUT_SUCCESS:
    case userActionTypes.CLEAR_ERRORS_SUCCESS:
      return {
        ...state,
        currentUser: null,
        error: null
      };
    case userActionTypes.SIGNUP_FAILURE:
    case userActionTypes.SIGNOUT_FAILURE:
    case userActionTypes.UPLOAD_FAILURE:
    case userActionTypes.SET_CURRENT_USER_FAILURE_LOGIN:
    case userActionTypes.SET_CURRENT_USER_FAILURE_SIGNUP:
    case userActionTypes.SET_CURRENT_USER_FAILURE_UPLOAD:
    case userActionTypes.SET_CHANGE_ENABLED_FAILURE:
      return {
        ...state,
        currentUser: state.currentuser ? state.currentUser : null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
