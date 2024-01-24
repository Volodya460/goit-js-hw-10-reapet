import axios from 'axios';
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const KEY =
  'live_n1L68uVNWhLhadDVWLmJwmHoHWn7tm12YzerJ8Vz4cmPTyeDCbZtcZhst0yCCeIZ';

axios.defaults.headers.common['x-api-key'] = KEY;

async function getAllCats() {
  try {
    loaderEl.removeAttribute('hidden');
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    selectEl.removeAttribute('hidden');
    return response.data;
  } catch (er) {
    return errorEl.removeAttribute('hidden');
  }
}

async function getOneCat(id) {
  try {
    catInfoEl.setAttribute('hidden', true);
    loaderEl.removeAttribute('hidden');
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${id}`
    );

    return response.data[0];
  } catch (error) {
    console.error(error);
  }
}

export { getAllCats, getOneCat };
