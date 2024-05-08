const saveToLocalStorage = (key, value) => {
   localStorage.setItem(key, JSON.stringify(value));
}

const getFromLocalStorage = (key) => {
   return JSON.parse(localStorage.getItem(key)) ?? [];
}

const isProductInCart = (cart, productId) => {
   return cart.some(el => el.id === productId);
}

const processAPIData = (data, container, getHTMLfunc) => {
   if (data) {
      data.forEach((item) => {
         container.insertAdjacentHTML('beforeend', getHTMLfunc(item));
      })
   }
}

const addEventListenerIfAvailable = (el, event, handler) => {
   if (el) {
      el.addEventListener(event, handler);
   }
}

const countProductsHolder = document.getElementById('js-count-products');
const displayProductCount = (data) => {
   countProductsHolder.innerHTML = data;
}

export { saveToLocalStorage, getFromLocalStorage, isProductInCart, processAPIData, displayProductCount, addEventListenerIfAvailable };

