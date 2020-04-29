import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const url = process.env.REACT_APP_URL;

export const makeCallToServerPasswordResset = async email => {
  //const env = runtimeEnv();
  const emailData = JSON.stringify({ email });

  const axiosInstance = await axios.create({
    baseURL: `${url}/api/v1/users/forgotPassword`,
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
