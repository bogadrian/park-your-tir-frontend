import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer/user-reducer';
import placesReducer from './placesReducer/places-reducer';
import coordsReducer from './coordsReducer/coords-reducer';
import placeReducer from './setPlace/setPlace-reducer';
import fetchPlaceReducer from './fetchPlace/fetchPlace-reducer';
import getMeReducer from './getMe/getMe-reducer';
import updateDeletePlaceReducer from './updateDelete/updateDelete-reducer';
import commentReducer from './setComment/setComment-reducer';
import getCommentsReducer from './getComments/getComments-reducer';
import ressetPasswordReducer from './ressetPassword/ressetPassword-reducer';
import updateDeleteCommentReducer from './updateDeleteCommentReducer/updateDeleteComment-reducer';
import passwordRessetReducer from './passwordResset/passwordResset-reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  places: placesReducer,
  coords: coordsReducer,
  place: placeReducer,
  fetchPlace: fetchPlaceReducer,
  me: getMeReducer,
  updateDelete: updateDeletePlaceReducer,
  comment: commentReducer,
  comments: getCommentsReducer,
  email: ressetPasswordReducer,
  updateDeleteComment: updateDeleteCommentReducer,
  passwords: passwordRessetReducer
});

export default persistReducer(persistConfig, rootReducer);
