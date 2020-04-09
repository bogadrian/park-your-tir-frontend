import { createSelector } from 'reselect';

const commentUpdateDelete = (state) => state.updateDelete;

export const commentUpdateDeleteSelector = createSelector(
  [commentUpdateDelete],
  (updateDelete) => updateDelete
);
