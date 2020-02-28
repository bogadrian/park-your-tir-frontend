import axios from 'axios';
const urlActual = process.env.REACT_APP_URL;

export const makeCallToServerPasswordResset = async passwords => {
  const { password, passwordConfirm, token } = passwords.payload;

  const data = { password, passwordConfirm };

  const response = await axios({
    method: 'PATCH',
    url: `${urlActual}/api/v1/users/resetPassword/${token}`,
    data
  });

  return response.data;
};
