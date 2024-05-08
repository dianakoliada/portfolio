import * as html from './render.js';
import * as utils from './utils.js';

const cartListHolder = document.getElementById('js-cart-list');
const cartBtn = document.getElementById('js-cart-btn');
const cartStaticHolder = document.querySelector('.cart-added-list');
let cartCount = document.querySelectorAll('.js-cart-count');

const cartList = utils.getFromLocalStorage('cartList');

const toggleCartBtn = () => {
   return cartListHolder.classList.toggle('show');
}

const displayCartCount = (array) => {
   let totalCount = 0;

   for (let item of array) {
      totalCount += parseInt(item.count);
   }

   return cartCount.forEach(el => el.innerHTML = totalCount);
}

const displayCartList = (array) => {
   if (cartListHolder) {
      cartListHolder.innerHTML = '';
   }

   if (array.length === 0 && cartListHolder) {
      cartListHolder.innerHTML = `<h2 class="no-result">Cart is empty</h2>`
   } else if (cartListHolder) {
      array.forEach(({ img, price, id, count, title }, index) => {
         cartListHolder.insertAdjacentHTML(
            'beforeend',
            html.getCartProductsListHTML(index, img, price, id, count, title));
      });
      cartListHolder.insertAdjacentHTML('beforeend',
         `<a href="order-page.html" class="js-order-page">Place an order</a>`
      );
   }
}

const addProductToCart = (item) => {
   const productInfo = item.dataset;

   if (utils.isProductInCart(cartList, productInfo.id)) {
      return;
   }
   cartList.push(productInfo);

   utils.saveToLocalStorage('cartList', cartList);
   displayCartList(cartList);
   displayCartCount(cartList);
}

const removeProductFromCart = (item) => {
   const idToRemove = item.dataset.index;
   cartList.splice(idToRemove, 1);

   utils.saveToLocalStorage('cartList', cartList);
   displayCartList(cartList);
   displayCartCount(cartList);
}

const changeProductCartCount = (item) => {
   const btnTypeValue = item.getAttribute('data-type');
   const dataInputValue = item.getAttribute('data-count');
   let input = document.querySelector(dataInputValue);
   let countValue = input.innerText;

   if (btnTypeValue === 'plus') {
      input.innerText++;
   } else if (btnTypeValue === 'minus' && countValue > 1) {
      input.innerText--;
   }

   let cartIndex = item.getAttribute('data-index');
   cartList[cartIndex].count = input.innerText;
   utils.saveToLocalStorage('cartList', cartList);
   displayCartCount(cartList);
}

const handleCartClicks = (e) => {
   let clickedEl = e.target;

   if (clickedEl.classList.contains('js-icon-cart') && clickedEl.classList.contains('js-icon-delete') && clickedEl.classList.contains('js-count-icon')) {
      e.preventDefault();
   }

   if (clickedEl.classList.contains('js-icon-cart')) {
      addProductToCart(clickedEl);
   }

   if (clickedEl.nodeName === 'I' && clickedEl.classList.contains('js-icon-delete')) {
      clickedEl = clickedEl.parentNode;
      removeProductFromCart(clickedEl);
   }

   if (clickedEl.nodeName === 'I' && clickedEl.classList.contains('js-count-icon')) {
      clickedEl = clickedEl.parentNode;
      changeProductCartCount(clickedEl);
   }
}

displayCartList(cartList);
displayCartCount(cartList);

export { cartList, cartListHolder, cartBtn, cartStaticHolder, addProductToCart, toggleCartBtn, handleCartClicks };






















