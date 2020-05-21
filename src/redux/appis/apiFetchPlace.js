import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

const makeCallToServerWithPlaceId = async placeId => {
  //const env = runtimeEnv();
  const place = await axios({
    method: 'GET',
    url: `https://bogdanpyt.xyz/api/v1/places/${placeId.payload}`
  });

  return place.data.data.data;
};

export default makeCallToServerWithPlaceId;
