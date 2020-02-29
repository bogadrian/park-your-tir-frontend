import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const urlActual = `${process.env.REACT_APP_URL}`;

export const makeCallToServerGetComments = async placeId => {
  //const env = runtimeEnv();
  const comments = await axios.get(
    `${urlActual}/api/v1/places/${placeId}/comments`
  );

  return comments.data;
};
