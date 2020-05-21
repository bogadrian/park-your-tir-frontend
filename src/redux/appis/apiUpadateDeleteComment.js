import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const token = localStorage.getItem('jwt');

export const makeCallToServerDeleteComment = async data => {
  //const env = runtimeEnv();
  const { commentId, placeId } = data;

  const axiosInstance = await axios.create({
    baseURL: `https://bogdanpyt.xyz/api/v1/places/${placeId}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const placeDeleted = await axiosInstance({
    method: 'DELETE'
  });

  return placeDeleted;
};

export const makeCallToServerUpdateComment = async dataPlain => {
  //const env = runtimeEnv();
  const { commentId, placeId, text } = dataPlain.payload;

  const post = {
    comment: text
  };

  const axiosInstance = await axios.create({
    baseURL: `https://bogdanpyt.xyz/api/v1/places/${placeId}/comments/${commentId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`,
      'Access-Control-Allow-Origin': '*'
    }
  });

  const placeUpdated = await axiosInstance({
    method: 'PATCH',
    data: post
  });

  return placeUpdated.data.data;
};
