import axios from 'axios';

const url = process.env.REACT_APP_URLC;

export const makeCallToServerGetComments = async placeId => {
  const comments = await axios.get(`${url}/api/v1/places/${placeId}/comments`);

  return comments.data;
};
