import { takeLatest, put, call, all } from 'redux-saga/effects';
import coordsActionTypes from './coords-types';
import { fetchCoordsSuccess, fetchCoordsFailure } from './coords-action';

export function* onFetchCoords(coords) {
  try {
    yield put(fetchCoordsSuccess(coords));
  } catch (err) {
    yield put(fetchCoordsFailure(err));
  }
}

export function* startFetch() {
  yield takeLatest(coordsActionTypes.START_FETCH_COORDS, onFetchCoords);
}
export function* coordsSaga() {
  yield all([call(startFetch)]);
}
