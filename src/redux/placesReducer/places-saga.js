import { takeLatest, put, call, all } from 'redux-saga/effects';

import placesActionTypes from './places-types';

import { fetchPlacesSuccess, fetchPlacesFailure } from './places-actions';

import { makeCallToServerFetchPlaces } from '../appis/apiPlaces';

export function* onStartFetching(payload) {
  console.log(payload);
  try {
    const places = yield call(makeCallToServerFetchPlaces, payload.payload);

    yield put(fetchPlacesSuccess(places.data.data.data));
  } catch (err) {
    yield put(fetchPlacesFailure(err));
  }
}

export function* fetchPlaces() {
  yield takeLatest(
    placesActionTypes.START_FETCH_PLACES_WITHIN,
    onStartFetching
  );
}

export function* placesSaga() {
  yield all([call(fetchPlaces)]);
}
