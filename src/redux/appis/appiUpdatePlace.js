import axios from 'axios';

//import runtimeEnv from '@mars/heroku-js-runtime-env';
const token = localStorage.getItem('jwt');
const url = process.env.REACT_APP_URLC;

export const makeCallToServerUpdate = async data => {
  //const env = runtimeEnv();
  const { name, desc, fileImg } = data;

  let form = new FormData();

  fileImg.forEach(img => {
    form.append('images', img);
  });

  if (name) {
    form.append('name', name);
  }

  if (desc) {
    form.append('description', desc);
  }

  const axiosInstance = await axios.create({
    baseURL: `${url}/api/v1/places/${data.placeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/form-data boundary=${form._boundary}`,
      'Access-Control-Allow-Origin': '*'
    }
  });

  for (let [key, value] of form.entries()) {
    console.log(key, value);
  }

  const placeUpdate = await axiosInstance({
    method: 'PATCH',
    data: form
  });

  return placeUpdate.data.data.data;
};

export const makeCallToSeverDeletePlace = async placeId => {
  //const env = runtimeEnv();
  const axiosInstance = await axios.create({
    baseURL: `${url}/api/v1/places/${placeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Access-Control-Allow-Origin': '*'
    }
  });

  const placeDeleted = await axiosInstance({
    method: 'DELETE'
  });

  return placeDeleted;
};
