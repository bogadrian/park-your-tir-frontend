import { createSelector } from 'reselect';

const selectPlaces = state => state.places;

export const selectPlacesSel = createSelector(
  [selectPlaces],
  places => places.places
);
