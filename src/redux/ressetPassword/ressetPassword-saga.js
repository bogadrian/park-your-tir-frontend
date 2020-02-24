import ressetPasswordTypes from './ressetPassword-types';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { ressetSuccess, ressetFailure } from './ressetPassword-actions';
import { makeCallToServerPasswordResset } from '../appis/appiPasswordResset';

export function* onResset(email) {
  try {
    const response = yield call(makeCallToServerPasswordResset, email.payload);
    if (response) {
      yield put(ressetSuccess(response));
    }
  } catch (err) {
    yield put(ressetFailure(err));
  }
}

export function* ressetPasswordStart() {
  yield takeLatest(ressetPasswordTypes.START_RESSET, onResset);
}

export function* ressetPassword() {
  yield all([call(ressetPasswordStart)]);
}
