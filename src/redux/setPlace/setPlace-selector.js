import { createSelector } from 'reselect';

const selectPlaceSet = state => state.fetchPlace;

export const selectPlaceSetSelector = createSelector(
  [selectPlaceSet],
  place => place
);

export const selectPlaceSetError = createSelector(
  [selectPlaceSet],
  error => error.error
);
