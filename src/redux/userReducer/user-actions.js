import userActionTypes from './user-types';

//signin actions
export const signInStart = ({ email, password }) => ({
  type: userActionTypes.SET_USER_START,
  payload: { email, password }
});

export const signInSuccess = user => ({
  type: userActionTypes.SET_CURRENT_USER_SUCCESS_LOGIN,
  payload: user
});

export const signInFailure = error => ({
  type: userActionTypes.SET_CURRENT_USER_FAILURE_LOGIN,
  payload: error
});

//signout actions
export const signOutSuccess = () => ({
  type: userActionTypes.SIGNOUT_SUCCESS
});

export const signOutStart = () => ({ type: userActionTypes.SIGNOUT_START });

export const signOutFailure = error => ({
  type: userActionTypes.SIGNOUT_FAILURE,
  payload: error
});

//signup actions
export const signUpSuccess = user => ({
  type: userActionTypes.SET_CURRENT_USER_SUCCESS_SIGNUP,
  payload: user
});

export const signUpFailure = error => ({
  type: userActionTypes.SET_CURRENT_USER_FAILURE_SIGNUP,
  payload: error
});

export const signUpStart = ({ name, email, password, passwordConfirm }) => ({
  type: userActionTypes.SIGNUP_START,
  payload: { name, email, password, passwordConfirm }
});

//clear errors actions
export const clearingErrors = () => ({
  type: userActionTypes.CLEAR_ERRORS_SUCCESS
});

export const clearErorr = () => ({
  type: userActionTypes.CLEAR_ERRORS
});

// set user in redux
export const setCurrentUserSuccess = user => ({
  type: userActionTypes.SET_CURRENT_USER_SUCCESS,
  payload: user
});

export const setCurrentUserFailure = error => ({
  type: userActionTypes.SET_CURRENT_USER_FAILURE,
  payload: error
});

// export const setCurrentUser = user => ({
//   type: userActionTypes.SET_CURRENT_USER,
//   payload: user
// });

//upload actions
export const setUserFailureUpload = error => ({
  type: userActionTypes.SET_CURRENT_USER_FAILURE_UPLOAD,
  payload: error
});

export const setUserSuccessUpload = user => ({
  type: userActionTypes.SET_CURRENT_USER_SUCCESS_UPLOAD,
  payload: user
});

export const uploadStart = user => ({
  type: userActionTypes.SET_CURRENT_USER_UPLOAD,
  payload: user
});
