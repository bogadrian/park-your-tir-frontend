import { all, call } from 'redux-saga/effects';
import { userSaga } from './userReducer/user-saga';

function* rootSaga() {
  yield all([call(userSaga)]);
}

export default rootSaga;
