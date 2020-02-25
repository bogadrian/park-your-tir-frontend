import axios from 'axios';
const token = localStorage.getItem('jwt');

export const makeCallToServerUpdate = async data => {
  const { name, desc, fileImg } = data;
  console.log(fileImg);

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
    baseURL: `http://127.0.0.1:3000/api/v1/places/${data.placeId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`
    }
  });

  for (let [key, value] of form.entries()) {
    console.log(key, value);
  }

  const placeUpdate = await axiosInstance({
    method: 'PATCH',
    data: form
  });

  console.log(placeUpdate.data.data);
  return placeUpdate.data.data;
};

export const makeCallToSeverDeletePlace = async placeId => {
  console.log(placeId);

  const axiosInstance = await axios.create({
    baseURL: `http://127.0.0.1:3000/api/v1/places/${placeId}`,
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const placeDeleted = await axiosInstance({
    method: 'DELETE'
  });
  console.log(placeDeleted);
  return placeDeleted;
};
