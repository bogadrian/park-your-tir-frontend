import axios from 'axios';

const FormData = require('form-data');
const urlActual = process.env.REACT_APP_URL;

export const makeCallToServerLogin = async userData => {
  const url = `${urlActual}/api/v1/users/login`;

  const data = userData.payload;

  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  const user = await axios.post(url, data, config);

  localStorage.removeItem('jwt');

  localStorage.setItem('jwt', user.data.token);

  return user;

  // return user.data.data.user;
};

export const makeCallToServerSignUp = async userData => {
  const url = `${urlActual}/api/v1/users/signup`;
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  const data = userData.payload;

  const user = await axios.post(url, data, config);

  localStorage.removeItem('jwt');

  localStorage.setItem('jwt', user.data.token);

  return user;
};

export const makeCallToServerUplod = async ({ photo, email, name }) => {
  const token = localStorage.getItem('jwt');

  const url = `${urlActual}/api/v1/users/updateMe`;

  const form = new FormData();
  form.append('photo', photo);
  form.append('name', name);
  form.append('email', email);

  const axiosInstance = await axios.create({
    baseURL: url,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
      'Access-Control-Allow-Origin': '*'
    }
  });

  const userUpdated = await axiosInstance({
    method: 'PATCH',
    data: form
  });

  return userUpdated.data;
};

// CHECK if the users is logged in. takes the token and returns the user actually logged in (if there is any)
// export const getCurrentUser = async () => {
//   const token = localStorage.getItem('jwt');
//   const url = 'http://127.0.0.1:3000/api/v1/users/isLoggedIn';

//   let checkUser;

//   if (token) {
//     checkUser = await axios({
//       method: 'GET',
//       url,
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//   }

//   if (checkUser) {
//     return checkUser;
//   }
// };
