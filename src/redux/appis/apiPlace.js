import truck from '../../images/truck.png';
import axios from 'axios';

//import runtimeEnv from '@mars/heroku-js-runtime-env';
const FormData = require('form-data');

export const makeCallToServerWithPlace = async place => {
  //const env = runtimeEnv();
  const data = place.payload;

  const coords = data.coords.payload;
  const photo = data.photo;
  const name = data.name.payload;
  const desc = data.desc.payload;
  const rating = data.rating.payload;

  const { lat, lng } = coords;

  const token = localStorage.getItem('jwt');

  const imag = photo.map(img => {
    return img.payload;
  });

  try {
    let form = new FormData();
    if (imag) {
      if (imag[0] && imag[1] === undefined) {
        form.append('images', truck);
      }

      if (imag[1] && imag[2] === undefined) {
        form.append('images', imag[1][0]);
      }

      if (imag[3]) {
        form.append('images', imag[3][0]);
        form.append('images', imag[3][1]);
      }
    } else {
      form.append('images', truck);
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
      baseURL: `https://bogdanpyt.xyz/api/v1/places`,
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

    return placeUpdate.data.data;
  } catch (err) {
    console.log(err);
  }
};

export default makeCallToServerWithPlace;
