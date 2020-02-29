import { takeLatest, put, call, all } from 'redux-saga/effects';
import coordsActionTypes from './coords-types';
import {
  fetchCoordsSuccess,
  fetchCoordsFailure,
  setNameSuccess,
  setNameFailure,
  setDescSuccess,
  setDescFailure,
  photoSuccess,
  photoFailure,
  ratingSuccess,
  ratingFailure,
  setAddressFailure,
  setAddressSuccess
} from './coords-action';

// coords saga
export function* onFetchCoords(coords) {
  try {
    yield put(fetchCoordsSuccess(coords));
  } catch (err) {
    yield put(fetchCoordsFailure(err));
  }
}

export function* startFetchCoords() {
  yield takeLatest(coordsActionTypes.START_FETCH_COORDS, onFetchCoords);
}

// name saga
export function* onStartName(name) {
  try {
    yield put(setNameSuccess(name));
  } catch (err) {
    yield put(setNameFailure(err));
  }
}

export function* startName() {
  yield takeLatest(coordsActionTypes.START_NAME, onStartName);
}

// desc saga
export function* onStartDesc(desc) {
  try {
    yield put(setDescSuccess(desc));
  } catch (err) {
    yield put(setDescFailure(err));
  }
}

export function* startDesc() {
  yield takeLatest(coordsActionTypes.START_DESC, onStartDesc);
}

// photo saga
export function* onStartPhoto(photo) {
  try {
    yield put(photoSuccess(photo));
  } catch (err) {
    yield put(photoFailure(err));
  }
}

export function* startPhoto() {
  yield takeLatest(coordsActionTypes.START_PHOTO, onStartPhoto);
}

//rating saga
export function* onRatingStart(rating) {
  try {
    yield put(ratingSuccess(rating));
  } catch (err) {
    yield put(ratingFailure(err));
  }
}

export function* ratingStart() {
  yield takeLatest(coordsActionTypes.RATING_START, onRatingStart);
}

export function* onStartAddressToDisplay(address) {
  try {
    yield put(setAddressSuccess(address.payload));
  } catch (err) {
    yield put(setAddressFailure(err));
  }
}

export function* startAddressToDisplay() {
  yield takeLatest(
    coordsActionTypes.START_SET_ADDRESS,
    onStartAddressToDisplay
  );
}

export function* coordsSaga() {
  yield all([
    call(startFetchCoords),
    call(startName),
    call(startDesc),
    call(startPhoto),
    call(ratingStart),
    call(startAddressToDisplay)
  ]);
}
