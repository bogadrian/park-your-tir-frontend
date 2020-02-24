import axios from 'axios';

export const makeCallToServerPasswordResset = async email => {
  const emailData = JSON.stringify({ email });

  const axiosInstance = await axios.create({
    baseURL: 'http://127.0.0.1:3000/api/v1/users/forgotPassword',
    headers: {
      //Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`
    }
  });

  const response = await axiosInstance({
    method: 'POST',
    data: emailData
  });

  return response;
};
