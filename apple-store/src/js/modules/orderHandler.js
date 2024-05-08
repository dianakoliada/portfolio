import * as cart from './cartHandler.js';
import * as html from './render.js';

const orderPageHolder = document.getElementById('js-order-page-holder');
const orderPageWrap = document.getElementById('js-order-block-holder');
const orderTotalHolder = document.getElementById('js-order-total');
const phoneInput = document.getElementById('phone');
let errorMessage = document.getElementById('error-message');
const formHolder = document.getElementById('js-form-holder');
const form = document.getElementById('js-form');


const getOrderTotalSum = () => {
   let totalSum = 0;

   for (let item of cart.cartList) {
      totalSum += item.count * item.price;
   }
   return totalSum.toFixed(2);
}

const displayOrderList = (array) => {
   if (orderTotalHolder) {
      orderTotalHolder.innerHTML = '';
   }

   if (array.length === 0 && orderPageHolder) {
      orderPageHolder.innerHTML = html.emptyOrderCartTemplate;
      formHolder.classList.add('hide');
   } else if (orderTotalHolder) {
      array.forEach(({ title, count, price, img }) => {
         orderTotalHolder.insertAdjacentHTML(
            'beforeend',
            html.getOrderedProductsHTML(title, count, price, img))
      })
      orderTotalHolder.innerHTML += `<p class="page-content total-sum">Total sum is: ${getOrderTotalSum()}</p>`
   }
}

const onTypeTelHandler = (e) => {
   let key = e.key;

   if (!(key >= '0' && key <= '9') && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(key)) {
      e.preventDefault();

      errorMessage.classList.remove('hide');
      errorMessage.innerText = 'Please, enter your phone number';
   } else {
      errorMessage.innerText = '';
   }
}

const checkTypeTelAmount = () => {
   if (phoneInput.value.length < 12 && phoneInput.value.length > 0) {
      errorMessage.classList.remove('hide');
      errorMessage.innerText = 'The phone number should contain exactly 12 digits';
      phoneInput.style.border = "1px solid red";
   } else {
      phoneInput.style.border = "none";
      errorMessage.innerText = '';
   }
}

const generateOrderNumber = () => {
   let randomNum = Math.floor(Math.random() * 1000);
   let orderNum = `${randomNum}`.padStart(3, '0');
   return orderNum;
}
let orderNumber = generateOrderNumber();

displayOrderList(cart.cartList);

export { displayOrderList, onTypeTelHandler, checkTypeTelAmount, phoneInput, orderPageHolder, form, errorMessage, orderNumber, formHolder, orderTotalHolder, orderPageWrap };
