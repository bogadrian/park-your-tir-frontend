import fetchPlaceActionTypes from './fetchPlace-types';

export const startFetch = placeId => ({
  type: fetchPlaceActionTypes.START_FETCH,
  payload: placeId
});

export const fetchSuccess = place => ({
  type: fetchPlaceActionTypes.FETCH_SUCCESS,
  payload: place
});

export const fetchFailure = error => ({
  type: fetchPlaceActionTypes.FETCH_FAILURE,
  payload: error
});
