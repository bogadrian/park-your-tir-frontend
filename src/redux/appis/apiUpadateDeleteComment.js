import axios from 'axios';
const token = localStorage.getItem('jwt');
const urlActual = process.env.REACT_APP_URL;

export const makeCallToServerDeleteComment = async data => {
  const { commentId, placeId } = data;

  const axiosInstance = await axios.create({
    baseURL: `${urlActual}/api/v1/places/${placeId}/comments/${commentId}`,
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
    baseURL: `${urlActual}/api/v1/places/${placeId}/comments/${commentId}`,
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
