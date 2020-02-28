import axios from 'axios';
const urlActual = process.env.REACT_APP_URL;

export const makeCallToServerGetMe = async () => {
  const token = localStorage.getItem('jwt');

  const url = `${urlActual}/api/v1/users/me`;

  const axiosInstance = await axios.create({
    baseURL: url,
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
