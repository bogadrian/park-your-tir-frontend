import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './userReducer/user-reducer';
import placesReducer from './placesReducer/places-reducer';
import coordsReducer from './coordsReducer/coords-reducer';
import placeReducer from './setPlace/setPlace-reducer';
import fetchPlaceReducer from './fetchPlace/fetchPlace-reducer';

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
  fetchPlace: fetchPlaceReducer
});

export default persistReducer(persistConfig, rootReducer);
