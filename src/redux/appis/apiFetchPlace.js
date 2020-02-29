import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const urlActual = `${process.env.REACT_APP_URL}`;

const makeCallToServerWithPlaceId = async placeId => {
  //const env = runtimeEnv();
  const place = await axios({
    method: 'GET',
    url: `${urlActual}/api/v1/places/${placeId.payload}`
  });

  return place.data.data.data;
};

export default makeCallToServerWithPlaceId;
