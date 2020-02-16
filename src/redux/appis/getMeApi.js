import axios from 'axios';

export const makeCallToServerGetMe = async () => {
  const token = localStorage.getItem('jwt');

  const url = 'http://127.0.0.1:3000/api/v1/users/me';

  const axiosInstance = await axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const me = await axiosInstance({
    method: 'GET'
  });

  return me.data.data.data;
};
