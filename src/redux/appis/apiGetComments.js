import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const url = process.env.REACT_APP_URL;

export const makeCallToServerGetComments = async placeId => {
  //const env = runtimeEnv();
  const comments = await axios.get(
    `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/${placeId}/comments`
  );

  return comments.data;
};
