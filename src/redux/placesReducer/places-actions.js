import placesActionTypes from './places-types';

export const startFetchPlacesWithin = payload => ({
  type: placesActionTypes.START_FETCH_PLACES_WITHIN,
  payload
});

export const fetchPlacesSuccess = places => ({
  type: placesActionTypes.START_FETCH_PLACES_WITHIN_SUCCESS,
  payload: places
});

export const fetchPlacesFailure = error => ({
  type: placesActionTypes.START_FETCH_PLACES_WITHIN_FAILURE,
  payload: error
});
