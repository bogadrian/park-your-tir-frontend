import { createSelector } from 'reselect';

const selectCoords = state => state.coords;

export const selectAddress = createSelector(
  [selectCoords],
  address => address.address
);

export const selectCoordsFunc = createSelector(
  [selectCoords],
  coords => coords.coords
);

export const selectCoordsFull = createSelector(
  [selectCoords],
  coords => coords
);
