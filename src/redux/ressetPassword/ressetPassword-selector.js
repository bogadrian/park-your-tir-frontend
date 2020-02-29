import { createSelector } from 'reselect';

const emailSelector = state => state.email;

export const selectEmailError = createSelector([emailSelector], error => error);
