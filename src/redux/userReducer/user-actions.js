import userActionTypes from './user-types';

export const setCurrentUser = user => ({
  type: userActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signInStart = ({ email, password }) => ({
  type: userActionTypes.SET_USER_START,
  payload: { email, password }
});

export const signInSuccess = user => ({
  type: userActionTypes.SET_USER_SUCCESS,
  payload: user
});

export const signInFailure = error => ({
  type: userActionTypes.SET_USER_FAILURE,
  payload: error
});

export const signOutStart = () => ({ type: userActionTypes.SIGNOUT_START });

export const signOutSuccess = () => ({
  type: userActionTypes.SIGNOUT_SUCCESS
});

export const signOutFailure = error => ({
  type: userActionTypes.SIGNOUT_FAILURE,
  payload: error
});

export const signUpStart = ({ name, email, password, passwordConfirm }) => ({
  type: userActionTypes.SIGNUP_START,
  payload: { name, email, password, passwordConfirm }
});

export const signUpSuccess = ({ email, password }) => ({
  type: userActionTypes.SIGNUP_SUCCESS,
  payload: { email, password }
});

export const signUpFailure = error => ({
  type: userActionTypes.SIGNUP_FAILURE,
  payload: error
});
