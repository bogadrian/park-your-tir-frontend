import getMeTypes from './getMe-types';

const INITIAL_STATE = {
  places: [],
  error: null
};

const getMeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case getMeTypes.GETME_SUCCESS:
      return {
        ...state,
        places: action.payload,
        error: null
      };
    case getMeTypes.GETME_FAILURE:
      return {
        ...state,
        places: [],
        error: action.payload
      };

    default:
      return state;
  }
};

export default getMeReducer;
