import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

export const makeCallToServerGetComments = async placeId => {
  //const env = runtimeEnv();
  const comments = await axios.get(
    `https://bogdanpyt.xyz/api/v1/places/${placeId}/comments`
  );

  return comments.data;
};
