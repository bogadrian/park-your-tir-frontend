import { takeLatest, put, call, all } from 'redux-saga/effects';

import userActionTypes from './user-types';
import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user-actions';

import { makeCallToServerLogin, makeCallToServerSignUp } from '../api';

export function* signIn(userData) {
  const result = yield call(makeCallToServerLogin, userData);

  try {
    yield put(signInSuccess(result));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* signInStart() {
  yield takeLatest(userActionTypes.SET_USER_START, signIn);
}

////////////////////////////////////////////////////////////////
//Sign Out Saga

export function* signOut() {
  try {
    //into the reducer
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFailure(err));
  }
}

export function* onSignOutStart() {
  yield takeLatest(userActionTypes.SIGNOUT_START, signOut);
}

///////////////////////////////////
//Sign Up Saga

export function* onSignUpSuccess(data) {
  try {
    const result = yield call(makeCallToServerLogin, data);
    console.log(result);
    yield put(signInSuccess(result));
  } catch (err) {
    yield put(signInFailure(err));
  }
}

export function* signUpSuc() {
  yield takeLatest(userActionTypes.SIGNUP_SUCCESS, onSignUpSuccess);
}
export function* onSignUp(user) {
  const { password } = user.payload;

  try {
    const result = yield call(makeCallToServerSignUp, user);

    const email = result.data.user.email;

    //into the reducer
    yield put(signUpSuccess({ email, password }));
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGNUP_START, onSignUp);
}

//////////////////////////////////
//all Saga

export function* userSaga() {
  yield all([
    call(signInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(signUpSuc)
  ]);
}
