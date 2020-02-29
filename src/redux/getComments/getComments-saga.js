import getCommentsTypes from './getComments-types';
import { takeLatest, put, call, all } from 'redux-saga/effects';

import { getCommentsSuccess, getCommentsFailure } from './getComments-actions';
import { makeCallToServerGetComments } from '../appis/apiGetComments';

export function* onGetComments(placeId) {
  try {
    const comments = yield call(makeCallToServerGetComments, placeId);
    yield put(getCommentsSuccess(comments.data));
  } catch (err) {
    yield put(getCommentsFailure(err));
  }
}

export function* startGetComments() {
  yield takeLatest(getCommentsTypes.GET_COMMENTS_START, onGetComments);
}

export function* getMeStart() {
  yield all([call(startGetComments)]);
}
