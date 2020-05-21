import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const url = process.env.REACT_APP_URLC;

export const makeCallToServerFetchPlaces = async payload => {
  let lat, lng;
  if (payload.centCoords) {
    lat = payload.centCoords.lat;
    lng = payload.centCoords.lng;
  }

  if (payload.latitude && payload.longitude) {
    lat = payload.latitude;
    lng = payload.longitude;
  }

  const { range } = payload;

  const response = await axios.get(
    `${url}/api/v1/places/places-within/${range}/center/${lat},${lng}`
  );

  return response;
};
