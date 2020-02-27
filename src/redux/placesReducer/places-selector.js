import { createSelector } from 'reselect';

const selectPlaces = state => state.places;

export const selectPlacesSel = createSelector(
  [selectPlaces],
  places => places.places
);

export const selectPlacesIsLoading = createSelector(
  [selectPlaces],
  places => !!places.places
);
