'use strict';
import * as utils from './modules/utils.js';
import * as api from './modules/fetchAPI.js';
import * as html from './modules/render.js';
import * as cat from './modules/categoryHandler.js';
import * as cart from './modules/cartHandler.js';
import * as search from './modules/searchHandler.js';
import * as order from './modules/orderHandler.js';

//loading spinner
window.addEventListener('load', () => {
   const loadContainer = document.getElementById('loading-container');
   loadContainer.classList.add('end-loading');
})

//active page
const activePage = window.location.pathname;
const navLinks = document.querySelectorAll('nav a');
navLinks.forEach(link => {
   if (link.href.includes(`${activePage}`)) {
      link.classList.add('active');
   }
})

//burgerMenu toggle
const burgerBtn = document.getElementById('js-burger');
const menuNav = document.getElementById('js-menu');
const navItems = document.querySelectorAll('.menu-btn__burger');

burgerBtn.addEventListener('click', () => {
   menuNav.classList.toggle('show');
   navItems.forEach((item) => item.classList.toggle('open'));
});

//getting api data (categories, goods)
(async () => {
   const data = await api.fetchData(api.APICategoties);
   if (data && html.categoryHolder) {
      html.categoryHolder.insertAdjacentHTML('beforeend',
         html.resetSelectionTemplate);

      utils.processAPIData(data, html.categoryHolder,
         ({ id, title }) => html.getCategoryHTML(id, title));
   }
})();

(async () => {
   const data = await api.fetchData(api.APICatalog);
   if (data && html.productCardsHolder) {
      utils.processAPIData(data, html.productCardsHolder,
         ({ img, id, title, price, oldprice }) => html.getProductsHTML(img, id, title, price, oldprice));
      utils.displayProductCount(data.length);
   }
})();

(async () => {
   const data = await api.fetchData(api.APICatalogHotOffers);
   if (data && html.hotOffersCardsHolder) {
      utils.processAPIData(data, html.hotOffersCardsHolder,
         ({ img, id, title, price, oldprice }) => html.getProductsHTML(img, id, title, price, oldprice));
   }
})();

//click handlers
utils.addEventListenerIfAvailable(cat.categoryList, 'click', cat.displayCategoryProducts);
utils.addEventListenerIfAvailable(cat.categoryBtn, 'click', cat.toggleCategoryList);
utils.addEventListenerIfAvailable(html.productCardsHolder, 'click', cart.handleCartClicks);
utils.addEventListenerIfAvailable(html.hotOffersCardsHolder, 'click', cart.handleCartClicks);
utils.addEventListenerIfAvailable(cart.cartBtn, 'click', cart.toggleCartBtn);
utils.addEventListenerIfAvailable(cart.cartStaticHolder, 'click', cart.handleCartClicks);

//search products handler
if (search.inputSearch) {
   search.inputSearch.oninput = search.searchProducts;
}

//validation phone input in the order page
if (order.phoneInput) {
   order.phoneInput.onkeypress = order.onTypeTelHandler;
   order.phoneInput.onblur = order.checkTypeTelAmount;
}

//display a success message in the order page
if (order.form) {
   order.form.addEventListener('submit', e => {
      e.preventDefault();

      order.orderPageWrap.classList.add('hide');
      order.orderPageHolder.insertAdjacentHTML('beforeend',
         html.getOrderSuccessHTML(order.orderNumber));
      window.scrollTo({ top: 0, behavior: 'smooth' });
   })
}













