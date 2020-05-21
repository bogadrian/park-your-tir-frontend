import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

export const makeCallToServerGetMe = async () => {
  //const env = runtimeEnv();
  const token = localStorage.getItem('jwt');

  const urlMe = `https://bogdanpyt.xyz/api/v1/users/me`;

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
