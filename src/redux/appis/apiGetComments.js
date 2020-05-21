import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const url = 'https://bogdanpyt.xyz';

export const makeCallToServerGetComments = async placeId => {
  //const env = runtimeEnv();
  const comments = await axios.get(`${url}/api/v1/places/${placeId}/comments`);

  return comments.data;
};
