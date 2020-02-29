import getMeTypes from './getMe-types';

export const startGetMe = () => ({
  type: getMeTypes.GETME_START
});

export const getMeSuccess = me => ({
  type: getMeTypes.GETME_SUCCESS,
  payload: me
});

export const getMeFailure = error => ({
  type: getMeTypes.GETME_FAILURE,
  payload: error
});
