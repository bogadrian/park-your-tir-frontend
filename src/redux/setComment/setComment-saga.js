import { takeLatest, put, call, all } from 'redux-saga/effects';
import setCommentTypes from './setComment-types';

import { makeCallToServerWithComment } from '../appis/apiComment';
import { commentSuccess, commentFailure } from './setComment-actions';

export function* onComment(comment) {
  try {
    const commentPosted = yield call(
      makeCallToServerWithComment,
      comment.payload
    );
    yield put(commentSuccess(commentPosted));
  } catch (err) {
    yield put(commentFailure(err));
  }
}

export function* setCommentStart() {
  yield takeLatest(setCommentTypes.START_COMMENT, onComment);
}

export function* setComment() {
  yield all([call(setCommentStart)]);
}
