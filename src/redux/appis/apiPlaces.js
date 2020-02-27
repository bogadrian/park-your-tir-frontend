import axios from 'axios';

export const makeCallToServerFetchPlaces = async payload => {
  const { range, latitude: lat, longitude: lng } = payload;

  const response = await axios.get(
    `http://127.0.0.1:3000/api/v1/places/places-within/${range}/center/${lat},${lng}`
  );

  return response;
};
