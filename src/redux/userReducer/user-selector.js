import { createSelector } from 'reselect';

const user = state => state.user;

export const selectUser = createSelector(
  [user],
  current => current.currentUser
);

export const selectError = createSelector([user], error => error.error);

export const selectUserIsLoded = createSelector(
  [user],
  current => !!current.currentUser
);
