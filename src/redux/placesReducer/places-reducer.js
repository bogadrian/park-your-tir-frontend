import placesActionTypes from './places-types';
import setPlaceActionTypes from '../setPlace/setPlace-types';

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
    case setPlaceActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        places: state.places.concat(action.payload.data),
        error: null
      };
    case setPlaceActionTypes.PATCH_SUCCESS:
    case setPlaceActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        places: state.places,
        error: null
      };

    case setPlaceActionTypes.CREATE_FAILURE:
    case setPlaceActionTypes.PATCH_FAILURE:
      return {
        ...state,
        places: state.places,
        error: action.payload
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
