import placesActionTypes from './places-types';

const INITIAL_STATE = {
  places: [],
  error: null
};

const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case placesActionTypes.START_FETCH_PLACES_WITHIN_SUCCESS:
      return {
        ...state,
        places: action.payload,
        error: null
      };

    case placesActionTypes.START_FETCH_PLACES_WITHIN_FAILURE:
      return {
        ...state,
        places: [],
        error: action.payload
      };
    default:
      return state;
  }
};
export default placesReducer;
