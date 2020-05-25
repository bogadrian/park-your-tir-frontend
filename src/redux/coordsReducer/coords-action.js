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

export const fetchCoordsCleanup = () => ({
  type: coordsActionTypes.FETCH_COORDS_Cleanup
});

export const setNameStart = name => ({
  type: coordsActionTypes.START_NAME,
  payload: name
});

export const setDescStart = desc => ({
  type: coordsActionTypes.START_DESC,
  payload: desc
});

export const setNameSuccess = name => ({
  type: coordsActionTypes.SET_NAME_SUCCESS,
  payload: name
});

export const setDescSuccess = desc => ({
  type: coordsActionTypes.SET_DESC_SUCCESS,
  payload: desc
});

export const setNameFailure = error => ({
  type: coordsActionTypes.SET_NAME_FAILURE,
  payload: error
});
export const setDescFailure = error => ({
  type: coordsActionTypes.SET_DESC_FAILURE,
  payload: error
});

export const startPhoto = photo => ({
  type: coordsActionTypes.START_PHOTO,
  payload: photo
});

export const photoSuccess = photo => ({
  type: coordsActionTypes.PHOTO_SUCCESS,
  payload: photo
});

export const photoFailure = error => ({
  type: coordsActionTypes.PHOTO_FAILURE,
  payload: error
});

export const ratingStart = rating => ({
  type: coordsActionTypes.RATING_START,
  payload: rating
});

export const ratingSuccess = rating => ({
  type: coordsActionTypes.RATING_SUCCESS,
  payload: rating
});

export const ratingFailure = error => ({
  type: coordsActionTypes.RATING_FAILURE,
  payload: error
});

export const startSetAddressToDisplay = address => ({
  type: coordsActionTypes.START_SET_ADDRESS,
  payload: address
});

export const setAddressSuccess = address => ({
  type: coordsActionTypes.SET_ADDRESS_SUCCESS,
  payload: address
});

export const setAddressFailure = error => ({
  type: coordsActionTypes.SET_ADDRESS_FAILURE,
  payload: error
});
