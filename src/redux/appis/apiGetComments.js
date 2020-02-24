import axios from 'axios';

export const makeCallToServerGetComments = async placeId => {
  const comments = await axios.get(
    `http://127.0.0.1:3000/api/v1/places/${placeId}/comments`
  );

  return comments.data;
};
