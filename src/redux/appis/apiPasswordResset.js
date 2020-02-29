import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const urlActual = `${process.env.REACT_APP_URL}`;

export const makeCallToServerPasswordResset = async passwords => {
  // const env = runtimeEnv();
  const { password, passwordConfirm, token } = passwords.payload;

  const data = { password, passwordConfirm };

  const response = await axios({
    method: 'PATCH',
    url: `${urlActual}/api/v1/users/resetPassword/${token}`,
    data
  });

  return response.data;
};
