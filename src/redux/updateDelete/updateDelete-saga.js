import { takeLatest, put, call, all } from 'redux-saga/effects';
import updateDeletePlaceTypes from './updateDelete-types';

import {
  updateDeleteSuccess,
  updateDeleteFailure
} from './updateDelete-actions';

export function* updateDelete(placeData) {
  try {
    yield put(updateDeleteSuccess(placeData));
  } catch (err) {
    yield put(updateDeleteFailure(err));
  }
}

export function* updateDeleteStartAction() {
  yield takeLatest(updateDeletePlaceTypes.UPDATE_PLACE_START, updateDelete);
}

export function* updateDeleteSaga() {
  yield all([call(updateDeleteStartAction)]);
}
