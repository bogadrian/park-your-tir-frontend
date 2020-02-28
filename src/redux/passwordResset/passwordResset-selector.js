import { createSelector } from 'reselect';

const selectPasswordRessetSelector = state => state.passwords;

export const passwordRessetSelector = createSelector(
  [selectPasswordRessetSelector],
  passwords => passwords.passwords
);
