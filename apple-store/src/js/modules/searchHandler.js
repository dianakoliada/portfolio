import * as utils from './utils.js';
import * as api from './fetchAPI.js';
import * as html from './render.js';

const inputSearch = document.getElementById('js-input-search');
let idTimeout = 0;

const fetchSearchedProducts = (inputValue) => {
   html.productCardsHolder.innerHTML = '';

   api.fetchData(api.APISearch + inputValue)
      .then(data => {
         if (!Array.isArray(data)) {
            html.productCardsHolder.innerHTML = '<h2>No products found</h2>';
            utils.displayProductCount(0);
         } else {
            utils.processAPIData(data, html.productCardsHolder, ({ img, id, title, price, oldprice }) => html.getProductsHTML(img, id, title, price, oldprice));

            utils.displayProductCount(data.length);
         }
      })
}

const searchProducts = (e) => {
   clearTimeout(idTimeout);

   idTimeout = setTimeout(() => {
      const inputValue = e.target.value;
      fetchSearchedProducts(inputValue);
   }, 700)
}

export { inputSearch, searchProducts };