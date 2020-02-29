import setPlaceActionTypes from './setPlace-types';

const INITIAL_STATE = {
  place: [],
  error: null
};

const placeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case setPlaceActionTypes.CREATE_SUCCESS:
    case setPlaceActionTypes.PATCH_SUCCESS:
      return {
        ...state,
        place: action.payload,
        error: null
      };
    case setPlaceActionTypes.CREATE_FAILURE:
    case setPlaceActionTypes.PATCH_FAILURE:
    case setPlaceActionTypes.DELETE_SUCCESS:
      return {
        ...state,
        place: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default placeReducer;
