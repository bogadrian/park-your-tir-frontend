import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const urlActual = `${process.env.REACT_APP_URL}`;

export const makeCallToServerFetchPlaces = async payload => {
  // const env = runtimeEnv();
  const { range, latitude: lat, longitude: lng } = payload;

  const response = await axios.get(
    `${urlActual}/api/v1/places/places-within/${range}/center/${lat},${lng}`
  );

  return response;
};
