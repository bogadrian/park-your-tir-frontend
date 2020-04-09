import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const token = localStorage.getItem('jwt');
const url = process.env.REACT_APP_URL;

export const makeCallToServerWithComment = async data => {
  //   const env = runtimeEnv();
  const rating = data.rating;
  const id = data.id;
  const comment = data.commentValue;

  const dataComment = JSON.stringify({ comment, rating });

  const axiosInstance = await axios.create({
    baseURL: `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/${id}/comments`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`
    }
  });

  const commentPosted = await axiosInstance({
    method: 'POST',
    data: dataComment
  });

  return commentPosted.data.data.data;
};
