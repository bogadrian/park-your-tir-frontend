import { createSelector } from 'reselect';

const selectMe = state => state.me;

export const selectGetMe = createSelector([selectMe], me => me.me.places);
