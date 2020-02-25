import axios from 'axios';
const token = localStorage.getItem('jwt');

export const makeCallToServerDeleteComment = async data => {
  const { commentId, placeId } = data;
  //console.log(commentId, placeId);

  const axiosInstance = await axios.create({
    baseURL: `http://127.0.0.1:3000/api/v1/places/${placeId}/comments/${commentId}`,
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
  const { commentId, placeId, text } = dataPlain.payload;

  const post = {
    comment: text
  };

  const axiosInstance = await axios.create({
    baseURL: `http://127.0.0.1:3000/api/v1/places/${placeId}/comments/${commentId}`,
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
