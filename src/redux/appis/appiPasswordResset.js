import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';

export const makeCallToServerPasswordResset = async email => {
  //const env = runtimeEnv();
  const emailData = JSON.stringify({ email });

  const axiosInstance = await axios.create({
    baseURL: `https://bogdan-park-your-tir.herokuapp.com/api/v1/users/forgotPassword`,
    headers: {
      'Content-Type': `application/json`
    }
  });

  const response = await axiosInstance({
    method: 'POST',
    data: emailData
  });

  return response;
};
