import passwordRessetTypes from './passwordResset-types';
import { takeLatest, put, call, all } from 'redux-saga/effects';

import {
  passwordRessetSuccess,
  passwordRessetFailure
} from './passwordResset-actions';

import { makeCallToServerPasswordResset } from '../appis/apiPasswordResset';

export function* onResset(passwords) {
  try {
    const response = yield call(makeCallToServerPasswordResset, passwords);

    if (response.status === 'success') {
      yield put(passwordRessetSuccess(response));
    }
  } catch (err) {
    yield put(passwordRessetFailure);
  }
}

export function* startPasswordResset() {
  yield takeLatest(passwordRessetTypes.START_PASSWORD_RESSET, onResset);
}

export function* passwordRessetSaga() {
  yield all([call(startPasswordResset)]);
}
