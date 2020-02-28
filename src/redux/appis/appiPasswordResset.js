import axios from 'axios';
const urlActual = process.env.REACT_APP_URL;

export const makeCallToServerPasswordResset = async email => {
  const emailData = JSON.stringify({ email });

  const axiosInstance = await axios.create({
    baseURL: `${urlActual}/api/v1/users/forgotPassword`,
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
