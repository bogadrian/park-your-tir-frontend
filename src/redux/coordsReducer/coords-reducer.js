import coordsActionTypes from './coords-types';

const INITIAL_STATE = {
  coords: [],
  name: null,
  desc: null,
  error: null,
  photo: [],
  rating: null,
  address: null
};

const coordsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case coordsActionTypes.SET_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload,
        error: null
      };
    case coordsActionTypes.SET_ADDRESS_FAILURE:
      return {
        ...state,
        address: null,
        error: action.payload
      };
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
    case coordsActionTypes.SET_NAME_SUCCESS:
      return {
        ...state,
        name: action.payload,
        error: null
      };
    case coordsActionTypes.SET_NAME_FAILURE:
      return {
        ...state,
        name: null,
        error: action.payload
      };
    case coordsActionTypes.SET_DESC_SUCCESS:
      return {
        ...state,
        desc: action.payload,
        error: null
      };
    case coordsActionTypes.SET_DESC_FAILURE:
      return {
        ...state,
        desc: null,
        error: action.payload
      };
    case coordsActionTypes.PHOTO_SUCCESS:
      return {
        ...state,
        photo: [...state.photo, action.payload],
        error: null
      };
    case coordsActionTypes.PHOTO_FAILURE:
      return {
        ...state,
        error: action.payload
      };
    case coordsActionTypes.RATING_SUCCESS:
      return {
        ...state,
        rating: action.payload,
        error: null
      };
    case coordsActionTypes.RATING_FAILURE:
      return {
        ...state,
        rating: null,
        error: action.payload
      };
    default:
      return state;
  }
};

export default coordsReducer;
