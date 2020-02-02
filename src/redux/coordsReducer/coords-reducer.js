import coordsActionTypes from './coords-types';

const INITIAL_STATE = {
  coords: null,
  error: null
};

const coordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case coordsActionTypes.FETCH_COORDS_SUCCESS:
      return {
        ...state,
        coords: action.payload,
        error: null
      };
    case coordsActionTypes.FETCH_COORDS_FAILURE:
      return {
        ...state,
        coords: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default coordsReducer;
