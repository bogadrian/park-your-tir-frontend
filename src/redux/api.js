import axios from 'axios';

export const makeCallToServerLogin = async userData => {
  const url = 'https://bogdan-park-your-tir.herokuapp.com/api/v1/users/login';
  const data = JSON.stringify(userData.payload);
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };

  try {
    const res = await axios.post(url, data, config);

    return res.data;
  } catch (err) {
    return err.message;
  }
};

export const makeCallToServerSignUp = async userData => {
  const url = 'https://bogdan-park-your-tir.herokuapp.com/api/v1/users/signup';
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  try {
    const body = JSON.stringify(userData.payload);

    const user = await axios.post(url, body, config);

    return user.data;
  } catch (err) {
    console.log(err);
  }
};
