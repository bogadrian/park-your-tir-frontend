import { takeLatest, put, call, all } from 'redux-saga/effects';
import setPlaceActionTypes from './setPlace-types';

import {
  createSuccess,
  createFailure,
  patchSuccess,
  patchFailure,
  deletePlaceSuccess,
  deletePlaceFailure
} from './setPlace-action';
import makeCallToServerWithPlace from '../appis/apiPlace';
import {
  makeCallToServerUpdate,
  makeCallToSeverDeletePlace
} from '../appis/appiUpdatePlace';

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

export function* onPatch(data) {
  try {
    const placeUpdated = yield call(makeCallToServerUpdate, data.payload);

    yield put(patchSuccess(placeUpdated));
  } catch (err) {
    yield put(patchFailure(err));
  }
}

export function* patchPlace() {
  yield takeLatest(setPlaceActionTypes.PATCH_START, onPatch);
}

export function* onDelete(placeId) {
  try {
    const placeDeleted = yield call(
      makeCallToSeverDeletePlace,
      placeId.payload
    );

    if (placeDeleted) {
      yield put(deletePlaceSuccess(placeId.payload));
    }
  } catch (err) {
    yield put(deletePlaceFailure());
  }
}

export function* startDeletePlace() {
  yield takeLatest(setPlaceActionTypes.DELETE_START, onDelete);
}

export function* setPlace() {
  yield all([call(startCreatePlace), call(patchPlace), call(startDeletePlace)]);
}
