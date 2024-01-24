import { getAllCats, getOneCat } from './fetch';
const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');
const loaderEl = document.querySelector('.loader');
const errorEl = document.querySelector('.error');
let intervalId = null;
let counter = 3;

selectEl.addEventListener('change', newCatcreated);
remember();
getAllCats()
  .then(x => {
    let markup = createCatsList(x);
    selectEl.insertAdjacentHTML('beforeend', markup);
  })
  .catch(err => console.log(err))
  .finally(() => {
    loaderEl.setAttribute('hidden', true);
  });

function createCatsList(arr) {
  return (app = arr.map(el => {
    return `
    <option value=${el.id}>${el.name}</option>`;
  })).join(' ');
}

function creatCat(data) {
  const { breeds, url: imgUrl } = data;
  return `

  <img src="${imgUrl}"width = 600 px/>
  <p>${breeds[0].name}<p/>
  <p>${breeds[0].description}</p>
  `;
}

function newCatcreated(ev) {
  let id = ev.target.value;
  getOneCat(id)
    .then(r => {
      catInfoEl.setAttribute('hidden', true);
      let markup = creatCat(r);
      catInfoEl.innerHTML = markup;
    })
    .catch(e => {
      errorEl.removeAttribute('hidden');
    })
    .finally(() => {
      loaderEl.setAttribute('hidden', true);
      catInfoEl.removeAttribute('hidden');
    });
}

function remember() {
  intervalId = setInterval(() => {
    if (counter === 0) {
      clearInterval(intervalId);
      return;
    }

    counter -= 1;
    console.log('REMEMBER');
  }, 2000);
}
