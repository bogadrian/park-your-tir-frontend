import { takeLatest, put, call, all } from 'redux-saga/effects';

import userActionTypes from './user-types';
import {
  signInFailure,
  signInSuccess,
  signOutSuccess,
  signOutFailure,
  signUpFailure,
  signUpSuccess,
  setUserSuccessUpload,
  setUserFailureUpload,
  clearingErrors,
  setChangeEnabledSucces,
  setChangeEnabledFailure
} from './user-actions';

import {
  makeCallToServerLogin,
  makeCallToServerSignUp,
  makeCallToServerUplod,
  callChangeEnabled
} from '../appis/apiUser';

export function* signIn(userData) {
  try {
    const result = yield call(makeCallToServerLogin, userData);

    if (result.data.status === 'success') {
      console.log(result.data);
      yield put(signInSuccess(result.data));
    }
  } catch (err) {
    yield put(signInFailure(err.message));
  }
}

export function* signInStart() {
  yield takeLatest(userActionTypes.SET_USER_START, signIn);
}

// ////////////////////////////////////////////////////////////////
// //Sign Out Saga

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

////////////////////
// signup saga

export function* onSignUp(userr) {
  try {
    const result = yield call(makeCallToServerSignUp, userr);
    console.log(result);

    if (result.data.status === 200) {
      yield put(signUpSuccess(result.data));
    }
  } catch (err) {
    yield put(signUpFailure(err));
  }
}

export function* onSignUpStart() {
  yield takeLatest(userActionTypes.SIGNUP_START, onSignUp);
}

// ////////////////////////////////
// //Clear Errors on user credentials wrong

export function* onClear() {
  yield put(clearingErrors());
}

export function* onClearErrors() {
  yield takeLatest(userActionTypes.CLEAR_ERRORS, onClear);
}

// ////////////////////////////////
// //Saga Photo Uploader

export function* onUpload(data) {
  try {
    const result = yield call(makeCallToServerUplod, data.payload);

    if (result) {
      yield put(setUserSuccessUpload(result));
    }
  } catch (err) {
    yield put(setUserFailureUpload(err));
  }
}

export function* onUploadStart() {
  yield takeLatest(userActionTypes.SET_CURRENT_USER_UPLOAD, onUpload);
}

//// Change Enabled
export function* onEnabled(data) {
  try {
    const result = yield call(callChangeEnabled, data.payload);

    if (result.status === 'success') {
      yield put(setChangeEnabledSucces(data.payload));
    }
  } catch (err) {
    yield put(setChangeEnabledFailure(err));
  }
}

export function* onChangeEnabled() {
  yield takeLatest(userActionTypes.SET_CHANGE_ENABLED_START, onEnabled);
}

// //////////////////////////////////
// //all Saga

export function* userSaga() {
  yield all([
    call(signInStart),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onClearErrors),
    call(onUploadStart),
    call(onChangeEnabled)
  ]);
}
