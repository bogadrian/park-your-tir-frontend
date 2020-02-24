import { all, call } from 'redux-saga/effects';
import { userSaga } from './userReducer/user-saga';
import { placesSaga } from './placesReducer/places-saga';
import { coordsSaga } from './coordsReducer/coords-saga';
import { setPlace } from './setPlace/setPlace-saga';
import { fetchPlace } from './fetchPlace/fetchPlace-saga';
import { getMeStart } from './getMe/getMe-saga';
import { updateDelete } from './updateDelete/updateDelete-saga';
import { setComment } from './setComment/setComment-saga';
import { startGetComments } from './getComments/getComments-saga';
import { ressetPassword } from './ressetPassword/ressetPassword-saga';

function* rootSaga() {
  yield all([
    call(userSaga),
    call(placesSaga),
    call(coordsSaga),
    call(setPlace),
    call(fetchPlace),
    call(getMeStart),
    call(updateDelete),
    call(setComment),
    call(startGetComments),
    call(ressetPassword)
  ]);
}

export default rootSaga;
