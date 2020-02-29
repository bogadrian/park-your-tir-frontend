import passwordRessetTypes from './passwordResset-types';

const INITIAL_STATE = {
  passwords: {},
  error: null
};

const passwordRessetReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case passwordRessetTypes.PASSWORD_RESSET_SUCCESS:
      return {
        ...state,
        passwords: action.payload,
        error: null
      };
    case passwordRessetTypes.PASSWORD_RESSET_FAILURE:
      return {
        ...state,
        passwords: {},
        error: action.payload
      };
    default:
      return state;
  }
};

export default passwordRessetReducer;
