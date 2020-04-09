import updateDeleteCommentTypes from './updateDeleteComment-types';
import { takeLatest, put, call, all } from 'redux-saga/effects';

import {
  deleteCommentSuccess,
  deleteCommentFailure,
  updateCommentSuccess,
  updateLastCommentSuccess,
  updateCommentFailure,
  updateLastCommentFailure
} from './updateDeleteComment-actions';

import {
  makeCallToServerDeleteComment,
  makeCallToServerUpdateComment
} from '../appis/apiUpadateDeleteComment';

export function* onDeleteComment(data) {
  try {
    const response = yield call(makeCallToServerDeleteComment, data.payload);
    if (response) {
      yield put(deleteCommentSuccess(response));
    }
  } catch (err) {
    yield put(deleteCommentFailure);
  }
}

export function* deleteComment() {
  yield takeLatest(
    updateDeleteCommentTypes.START_DELETE_COMMENT,
    onDeleteComment
  );
}

export function* onUpdate(data) {
  try {
    const commentUpdated = yield call(makeCallToServerUpdateComment, data);
    yield put(updateCommentSuccess(commentUpdated));
    yield put(updateLastCommentSuccess(commentUpdated));
  } catch (err) {
    yield put(updateCommentFailure(err));
    yield put(updateLastCommentFailure(err));
  }
}

export function* updateComment() {
  yield takeLatest(updateDeleteCommentTypes.START_UPDATE_COMMENT, onUpdate);
}

export function* updateDeleteCommentSaga() {
  yield all([call(updateComment), call(deleteComment)]);
}
