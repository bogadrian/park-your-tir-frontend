import { takeLatest, put, call, all } from 'redux-saga/effects';
import setCommentTypes from './setComment-types';

import { makeCallToServerWithComment } from '../appis/apiComment';
import {
  commentSuccess,
  commentFailure,
  getLastCommentInCommentsSuccess,
  getLastCommentInCommentsFailure
} from './setComment-actions';

export function* onComment(comment) {
  try {
    const commentPosted = yield call(
      makeCallToServerWithComment,
      comment.payload
    );

    yield put(commentSuccess(commentPosted));
    yield put(getLastCommentInCommentsSuccess(commentPosted));
  } catch (err) {
    yield put(commentFailure(err));
    yield put(getLastCommentInCommentsFailure(err));
  }
}

export function* setCommentStart() {
  yield takeLatest(setCommentTypes.START_COMMENT, onComment);
}

export function* setComment() {
  yield all([call(setCommentStart)]);
}
