import ressetPasswordTypes from './ressetPassword-types';

export const startResset = email => ({
  type: ressetPasswordTypes.START_RESSET,
  payload: email
});
export const ressetSuccess = email => ({
  type: ressetPasswordTypes.RESSET_SUCCESS,
  payload: email
});
export const ressetFailure = error => ({
  type: ressetPasswordTypes.RESSET_FAILURE,
  payload: error
});
