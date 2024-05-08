import * as utils from './utils.js';
import * as api from './fetchAPI.js';
import * as html from './render.js';

const categoryBtn = document.getElementById('js-category-btn');
const categoryList = document.getElementById('js-category-list');

const displayCategoryProducts = (e) => {
   e.preventDefault();

   const category = e.target;
   const categoryId = category.getAttribute('href');

   api.fetchData(api.APICatalog + '?catid=' + categoryId)
      .then(data => {
         if (!Array.isArray(data)) {
            html.productCardsHolder.innerHTML = '<h2>No products found</h2>';
            utils.displayProductCount(0);

         } else {
            html.productCardsHolder.innerHTML = '';

            data.forEach(({ img, id, title, price, oldprice }) => {
               html.productCardsHolder.insertAdjacentHTML(
                  'beforeend',
                  html.getProductsHTML(img, id, title, price, oldprice));
            });
            utils.displayProductCount(data.length);
         }
      });
}

const toggleCategoryList = () => {
   categoryList.classList.toggle('show');
}

export { categoryBtn, categoryList, displayCategoryProducts, toggleCategoryList };

