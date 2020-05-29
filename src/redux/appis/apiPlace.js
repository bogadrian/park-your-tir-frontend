import axios from 'axios';
const url = process.env.REACT_APP_URLC;
//import runtimeEnv from '@mars/heroku-js-runtime-env';
const FormData = require('form-data');

export const makeCallToServerWithPlace = async place => {
  const data = place.payload;

  const coords = data.coords.payload;
  const photo = data.photo;
  const name = data.name.payload;
  const desc = data.desc.payload;
  const rating = data.rating.payload;
  const imag = photo[photo.length - 1].payload;

  const { lat, lng } = coords;

  const token = localStorage.getItem('jwt');

  try {
    let form = new FormData();

    if (imag) {
      imag.forEach(img => {
        form.append('images', img);
      });
    }

    if (name) {
      form.append('name', name);
    }

    if (desc) {
      form.append('description', desc);
    }

    if (rating) {
      form.append('ratingsAverage', rating);
    }

    form.append('position', [lng, lat]);

    const axiosInstance = await axios.create({
      baseURL: `${url}/api/v1/places`,
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
      method: 'POST',
      data: form
    });
    //console.log(placeUpdate.data.data);
    return placeUpdate.data.data;
  } catch (err) {
    console.log(err);
  }
};

export default makeCallToServerWithPlace;
