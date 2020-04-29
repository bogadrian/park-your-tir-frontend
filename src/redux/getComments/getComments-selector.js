import { createSelector } from 'reselect';

const commentsSelector = state => state.comments;

export const selectComments = createSelector(
  [commentsSelector],
  comments => comments.comments
);
