import passwordRessetTypes from './passwordResset-types';

export const passwordRessetStart = data => ({
  type: passwordRessetTypes.START_PASSWORD_RESSET,
  payload: data
});

export const passwordRessetSuccess = string => ({
  type: passwordRessetTypes.PASSWORD_RESSET_SUCCESS,
  payload: string
});

export const passwordRessetFailure = error => ({
  type: passwordRessetTypes.PASSWORD_RESSET_FAILURE,
  payload: error
});
