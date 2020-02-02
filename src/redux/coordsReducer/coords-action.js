import coordsActionTypes from './coords-types';

export const startFetchCoords = coords => ({
  type: coordsActionTypes.START_FETCH_COORDS,
  payload: coords
});

export const fetchCoordsSuccess = coords => ({
  type: coordsActionTypes.FETCH_COORDS_SUCCESS,
  payload: coords
});

export const fetchCoordsFailure = error => ({
  type: coordsActionTypes.FETCH_COORDS_FAILURE,
  payload: error
});
