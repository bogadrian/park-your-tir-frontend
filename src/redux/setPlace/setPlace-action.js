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
