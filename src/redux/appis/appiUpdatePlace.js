import axios from 'axios';
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const token = localStorage.getItem('jwt');

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
    baseURL: `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/${data.placeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`
    }
  });

  // for (let [key, value] of form.entries()) {
  //   console.log(key, value);
  // }

  const placeUpdate = await axiosInstance({
    method: 'PATCH',
    data: form
  });

  return placeUpdate.data.data;
};

export const makeCallToSeverDeletePlace = async placeId => {
  //const env = runtimeEnv();
  const axiosInstance = await axios.create({
    baseURL: `https://bogdan-park-your-tir.herokuapp.com/api/v1/places/${placeId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const placeDeleted = await axiosInstance({
    method: 'DELETE'
  });

  return placeDeleted;
};
