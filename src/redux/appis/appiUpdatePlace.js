import axios from 'axios';
const token = localStorage.getItem('jwt');

export const makeCallToServerUpdate = async data => {
  const name = data.payload.placeData.name.payload;
  const description = data.payload.placeData.desc.payload;

  let dataJson;
  if (!name && description) {
    dataJson = JSON.stringify({ description });
  } else if (!description && name) {
    dataJson = JSON.stringify({ name });
  } else {
    dataJson = JSON.stringify({ name, description });
  }

  const axiosInstance = await axios.create({
    baseURL: `http://127.0.0.1:3000/api/v1/places/${data.payload.id}`,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `application/json`
    }
  });

  const placeUpdate = await axiosInstance({
    method: 'PATCH',
    data: dataJson
  });

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
