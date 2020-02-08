import setPlaceActionTypes from './setPlace-types';

const INITIAL_STATE = {
  place: null,
  error: null
};

const placeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case setPlaceActionTypes.CREATE_SUCCESS:
      return {
        ...state,
        place: action.payload,
        error: null
      };
    case setPlaceActionTypes.CREATE_FAILURE:
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
