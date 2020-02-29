import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

export const fetchAddressFromCoords = async latlng => {
  // const env = runtimeEnv();

  const response = await axios.get(
    `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/addressByCoords/${latlng}`
  );

  return response;
};

export const fetchCoordsFromAdress = async address => {
  //const env = runtimeEnv();
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  const data = address;

  const url = `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/coordByAdress/${address}`;

  const response = await axios.get(url, data, config);

  return response;
};
