import { createSelector } from 'reselect';

const selectPlace = state => state.fetchPlace;

export const selectPlaceItem = createSelector(
  [selectPlace],
  place => place.placeResult
);
