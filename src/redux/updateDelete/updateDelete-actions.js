import updateDeletePlaceTypes from './updateDelete-types';

export const startUpdatePlace = placeData => ({
  type: updateDeletePlaceTypes.UPDATE_PLACE_START,
  payload: placeData
});

export const updateDeleteSuccess = placeData => ({
  type: updateDeletePlaceTypes.UPDATE_PLACE_SUCCESS,
  payload: placeData
});

export const updateDeleteFailure = error => ({
  type: updateDeletePlaceTypes.UPDATE_PLACE_FAILURE,
  payload: error
});
