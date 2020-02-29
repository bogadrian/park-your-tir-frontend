import { createSelector } from 'reselect';

export const selectMe = state => state.me;

export const selectMiIsLoaded = createSelector([selectMe], me => !!me.me);
