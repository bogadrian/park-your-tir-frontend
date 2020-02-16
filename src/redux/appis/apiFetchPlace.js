import axios from 'axios';

const makeCallToServerWithPlaceId = async placeId => {
  const place = await axios({
    method: 'GET',
    url: `http://127.0.0.1:3000/api/v1/places/${placeId.payload}`
  });

  return place.data.data.data;
};

export default makeCallToServerWithPlaceId;
