import { all, call } from 'redux-saga/effects';
import { userSaga } from './userReducer/user-saga';
import { placesSaga } from './placesReducer/places-saga';
import { coordsSaga } from './coordsReducer/coords-saga';

function* rootSaga() {
  yield all([call(userSaga), call(placesSaga), call(coordsSaga)]);
}

export default rootSaga;
