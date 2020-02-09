import { all, call } from 'redux-saga/effects';
import { userSaga } from './userReducer/user-saga';
import { placesSaga } from './placesReducer/places-saga';
import { coordsSaga } from './coordsReducer/coords-saga';
import { setPlace } from './setPlace/setPlace-saga';
import { fetchPlace } from './fetchPlace/fetchPlace-saga';

function* rootSaga() {
  yield all([
    call(userSaga),
    call(placesSaga),
    call(coordsSaga),
    call(setPlace),
    call(fetchPlace)
  ]);
}

export default rootSaga;
