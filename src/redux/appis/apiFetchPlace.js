import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

const makeCallToServerWithPlaceId = async placeId => {
  //const env = runtimeEnv();
  const place = await axios({
    method: 'GET',
    url: `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/${placeId.payload}`
  });

  return place.data.data.data;
};

export default makeCallToServerWithPlaceId;
