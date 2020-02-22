import updateDeletePlaceTypes from './updateDelete-types';

const INITIAL_STATE = {
  placeData: {},
  error: null
};

const updateDeletePlaceReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case updateDeletePlaceTypes.UPDATE_PLACE_SUCCESS:
      return {
        ...state,
        placeData: action.payload,
        error: null
      };
    case updateDeletePlaceTypes.UPDATE_PLACE_FAILURE:
      return {
        ...state,
        placeData: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default updateDeletePlaceReducer;
