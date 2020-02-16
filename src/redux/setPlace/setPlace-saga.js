import { takeLatest, put, call, all } from 'redux-saga/effects';
import setPlaceActionTypes from './setPlace-types';

import { createSuccess, createFailure } from './setPlace-action';
import makeCallToServerWithPlace from '../appis/apiPlace';

export function* onCreate(place) {
  try {
    const placeCreated = yield call(makeCallToServerWithPlace, place);

    yield put(createSuccess(placeCreated));
  } catch (err) {
    yield put(createFailure(err));
  }
}

export function* startCreatePlace() {
  yield takeLatest(setPlaceActionTypes.START_CREATE, onCreate);
}

export function* setPlace() {
  yield all([call(startCreatePlace)]);
}
