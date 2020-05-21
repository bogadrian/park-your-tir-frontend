import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const url = process.env.REACT_APP_URLC;

export const makeCallToServerGetMe = async () => {
  //const env = runtimeEnv();
  const token = localStorage.getItem('jwt');

  const urlMe = `${url}/api/v1/users/me`;

  const axiosInstance = await axios.create({
    baseURL: urlMe,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const result = await axiosInstance({
    method: 'GET'
  });

  return result;
};
