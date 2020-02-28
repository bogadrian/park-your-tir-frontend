import axios from 'axios';
const urlActual = process.env.REACT_APP_URL;

export const makeCallToServerGetComments = async placeId => {
  const comments = await axios.get(
    `${urlActual}/api/v1/places/${placeId}/comments`
  );

  return comments.data;
};
