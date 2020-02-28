import axios from 'axios';
const urlActual = process.env.REACT_APP_URL;

const makeCallToServerWithPlaceId = async placeId => {
  const place = await axios({
    method: 'GET',
    url: `${urlActual}/api/v1/places/${placeId.payload}`
  });

  return place.data.data.data;
};

export default makeCallToServerWithPlaceId;
