import setPlaceActionTypes from './setPlace-types';

export const startCreate = place => ({
  type: setPlaceActionTypes.START_CREATE,
  payload: place
});

export const createSuccess = place => ({
  type: setPlaceActionTypes.CREATE_SUCCESS,
  payload: place
});

export const createFailure = error => ({
  type: setPlaceActionTypes.CREATE_FAILURE,
  payload: error
});

export const patchFailure = error => ({
  type: setPlaceActionTypes.PATCH_FAILURE,
  payload: error
});

export const patchSuccess = placeData => ({
  type: setPlaceActionTypes.PATCH_SUCCESS,
  payload: placeData
});

export const startPatch = data => ({
  type: setPlaceActionTypes.PATCH_START,
  payload: data
});

export const deletePlace = id => ({
  type: setPlaceActionTypes.DELETE_START,
  payload: id
});

export const deletePlaceSuccess = () => ({
  type: setPlaceActionTypes.DELETE_SUCCESS
});

export const deletePlaceFailure = () => ({
  type: setPlaceActionTypes.DELETE_FAILURE
});
