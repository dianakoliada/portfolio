const categoryHolder = document.getElementById('js-category-list');
const productCardsHolder = document.getElementById('js-product-cards');
const hotOffersCardsHolder = document.getElementById('js-hot-offers');

const resetSelectionTemplate = `<a href="#" class="dropdown-item">Reset selection</a>`;
const placeAnOrderTemplate = `<a href="order-page.html" target="_blanc" class="to-order-text no-result-cart-sm">Place an order</a>`;
const emptyOrderCartTemplate = `
   <div class="empty-cart-holder">
      <h2>Your cart is empty now </h2>
      <a href="index.html">
         <i class="fa-solid fa-cart-shopping icon icon-cart"></i>
         Back to the store
      </a>
   </div>`;


const getCategoryHTML = (id, title) => {
   return `
   <li>
      <a class="dropdown-item" href="${id}">${title}</a>
   </li>`
}

const getProductsHTML = (img, id, title, price, oldprice) => {
   return `
   <div class="card-product">
      <div class="card-product__img-hold">
         <img src="../src/img/catalog/${img}" alt="${title}" class="card-product__img js-product-img">
      </div>
      <div class="card-product__text-hold">
         <p href="#" class="card-product__title-link">${title}</p>
         <span class="card-product__price">${price} USD <small>${oldprice} USD</small></span>
         </div>
      <a href="#" class="btn js-icon-cart" data-id="${id}" data-title="${title}"
            data-price="${price}" data-img="${img}" data-count="1">Add to Cart</i></a>
   </div>`
}

const getCartProductsListHTML = (index, img, price, id, count, title) => {
   return `
   <div class="cart-added-list__item">
      <button class="cart-added-list__item-btn-delete js-btn-delete" data-index="${index}">
         <i class="fa-solid fa-xmark js-icon-delete"></i>
       </button>
      <img src="../src/img/catalog/${img}" alt="" class="cart-added-list__item-img">
      <p class="cart-added-list__item-text-hold">
         <a href="#" class="cart-added-list__item-title-link">${title}</a>
         <span class="cart-added-list__item-meta-list">
            <span class="cart-added-list__item-meta">${price} USD</span>
         </span>
      </p>
      <p class="cart-added-list__item-count js-display-count" id="js-display-count-${id}">${count}</p>
      <button class="cart-added-list__item-btn-plus js-count" data-type="plus" data-count="#js-display-count-${id}" data-index="${index}">
         <i class="fa-solid fa-plus js-count-icon"></i>
      </button>
      <button class="cart-added-list__item-btn-minus js-count" data-type="minus"
      data-count="#js-display-count-${id}" data-index="${index}">
         <i class="fa-solid fa-minus js-count-icon"></i>
      </button>
   </div>`
}

const getOrderedProductsHTML = (title, count, price, img) => {
   return `
   <div class="cart-ordered-list__item">
      <div class="cart-ordered-list__item-img-hold">
         <img src="../src/img/catalog/${img}" alt="${title}" class="cart-ordered-list__item-img">
      </div>
      <div class="cart-ordered-list__item-text-hold">
         <p>${title}</p>
         <p>amount ${count}</p>
         <p>${price} USD</p>
      </div>
   </div>`
}

const getOrderSuccessHTML = (num) => {
   return `
   <div class="page-content success">
      <i class="fa-regular fa-circle-check icon"></i>
      <p class="page-content__success">Thank you!</p>
      <p class="page-content__success">Your order has been accepted!</p>
      <p class="page-content__success world-wrap">The order number is: ${num}</p>
      <p class="page-content__success">Our staff will contact you in the near term!</p>
   </div>`
}

export { getCategoryHTML, getProductsHTML, getCartProductsListHTML, getOrderedProductsHTML, getOrderSuccessHTML, categoryHolder, productCardsHolder, hotOffersCardsHolder, resetSelectionTemplate, placeAnOrderTemplate, emptyOrderCartTemplate };
