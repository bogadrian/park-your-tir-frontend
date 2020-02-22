import getMeTypes from './getMe-types';
import { takeLatest, put, call, all } from 'redux-saga/effects';
import { makeCallToServerGetMe } from '../appis/getMeApi';

import { getMeSuccess, getMeFailure } from './getMe-actions';

export function* onGetMeStart() {
  try {
    const result = yield call(makeCallToServerGetMe);

    yield put(getMeSuccess(result.data.data.data.places));
  } catch (err) {
    yield put(getMeFailure(err));
  }
}

export function* getMeStartAction() {
  yield takeLatest(getMeTypes.GETME_START, onGetMeStart);
}

export function* getMeStart() {
  yield all([call(getMeStartAction)]);
}
