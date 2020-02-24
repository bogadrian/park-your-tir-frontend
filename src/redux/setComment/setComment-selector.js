import { createSelector } from 'reselect';

const commentSelector = state => state.comment;

export const selectComment = createSelector(
  [commentSelector],
  comment => comment
);
