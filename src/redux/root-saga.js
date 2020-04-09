import { all, call } from 'redux-saga/effects';
import { userSaga } from './userReducer/user-saga';
import { placesSaga } from './placesReducer/places-saga';
import { coordsSaga } from './coordsReducer/coords-saga';
import { setPlace } from './setPlace/setPlace-saga';
import { fetchPlace } from './fetchPlace/fetchPlace-saga';
import { getMeStart } from './getMe/getMe-saga';
import { updateDelete } from './updateDelete/updateDelete-saga';
import { setComment } from './setComment/setComment-saga';
import { getCommentsStart } from './getComments/getComments-saga';
import { ressetPassword } from './ressetPassword/ressetPassword-saga';
import { updateDeleteCommentSaga } from './updateDeleteCommentReducer/updateDeleteComment-saga';
import { passwordRessetSaga } from './passwordResset/passwordResset-saga';

function* rootSaga() {
  yield all([
    call(userSaga),
    call(placesSaga),
    call(coordsSaga),
    call(setPlace),
    call(fetchPlace),
    call(getCommentsStart),
    call(updateDelete),
    call(setComment),
    call(getMeStart),
    call(ressetPassword),
    call(updateDeleteCommentSaga),
    call(passwordRessetSaga),
  ]);
}

export default rootSaga;
