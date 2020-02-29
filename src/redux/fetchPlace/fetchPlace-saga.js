import { takeLatest, put, call, all } from 'redux-saga/effects';
import fetchPlaceActionTypes from './fetchPlace-types';

import { fetchSuccess, fetchFailure } from './fetchPlace-action';
import makeCallToServerWithPlaceId from '../appis/apiFetchPlace';

export function* onFetchStart(placeId) {
  try {
    const place = yield call(makeCallToServerWithPlaceId, placeId);

    yield put(fetchSuccess(place));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

export function* startFetchPlace() {
  yield takeLatest(fetchPlaceActionTypes.START_FETCH, onFetchStart);
}

export function* fetchPlace() {
  yield all([call(startFetchPlace)]);
}
