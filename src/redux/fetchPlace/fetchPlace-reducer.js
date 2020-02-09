import fetchPlaceActionTypes from './fetchPlace-types';

const INITIAL_STATE = {
  placeResult: {},
  error: null
};

const fetchPlaceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case fetchPlaceActionTypes.FETCH_SUCCESS:
      return {
        ...state,
        placeResult: action.payload,
        error: null
      };
    case fetchPlaceActionTypes.FETCH_FAILURE:
      return {
        ...state,
        placeResult: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default fetchPlaceReducer;
