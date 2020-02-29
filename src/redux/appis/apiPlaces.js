import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

export const makeCallToServerFetchPlaces = async payload => {
  // const env = runtimeEnv();
  const { range, latitude: lat, longitude: lng } = payload;

  const response = await axios.get(
    `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/places-within/${range}/center/${lat},${lng}`
  );

  return response;
};
