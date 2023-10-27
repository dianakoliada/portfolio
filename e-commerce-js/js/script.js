// Оголошуємо об'єкт shop
const shop = function () {

   /**
    * Функції помічники
    */

   // Зберігаємо дані в localstorage
   this.saveLocal = (keyStr, value) => {

      // Зберігаємо в localstorage
      localStorage.setItem(keyStr, JSON.stringify(value));
   }

   // Дістаємо дані з localstorage
   this.getLocal = (keyStr) => {

      return JSON.parse(localStorage.getItem(keyStr)) ?? [];

      // // Повертаємо дані з localstorage
      // let res = localStorage.getItem(keyStr);

      // res = JSON.parse(res);

      // if (res == null) {
      //    res = [];
      // }

      // return res;
   }

   // Перевірка товару на дублікат
   this.isProductInCart = (cart, productId) => {
      // Повертаю булеве значення існування товару в корзині
      return cart.some(item => item.id === productId);
   }

   // Отримання URL params для перевірки на якій стр знаходимось
   this.getUrlParams = () => {
      this.url = window.location.search;

      // Перевірка на пустоту
      if (this.url == '')
         return {};

      //Розділення URL на частини:
      this.urlParts = this.url.split('?');

      //Отримання рядка з GET-параметрами:
      this.queryParams = this.urlParts[1];

      //Розділення рядка з GET-параметрами на окремі параметри:
      this.params = this.queryParams.split('&');

      //Створення об'єкта для зберігання значень параметрів:
      this.paramsObj = {};

      // Проходження через кожен параметр і зберігання його значення в об'єкті
      for (let i = 0; i < this.params.length; i++) {
         this.param = this.params[i].split('=');
         this.paramName = decodeURIComponent(this.param[0]);
         this.paramValue = decodeURIComponent(this.param[1]);
         this.paramsObj[this.paramName] = this.paramValue;
      }

      // Повертаємо параметри
      return this.paramsObj;
   }

   // Загальна функція для перевірки коректності сторінки
   this.isCorrectPage = (param) => {

      // Диструктуризація об'єкта
      const { page } = this.getUrlParams();

      // Робимо перевірку на type = order
      return page == param;
   }


   // Змінні для роботи об'єкту
   this.catalog = document.querySelectorAll('.js-catalog-cards');
   this.catalogMain = document.querySelector('#catalog-cards');
   this.category = document.querySelector('#js-category');
   this.categoryBtn = document.querySelector('.dropdown-btn');
   this.countProducts = document.querySelector('#count-products');
   this.displayProductCart = document.querySelector('#js-cart-added-list');
   this.cartInfoTotal = document.querySelector('#js-cart-total');
   this.cartBtn = document.querySelector('#js-cart-added-btn');
   this.cartProductNum = document.querySelectorAll('.js-cart-added-summ');
   this.inputSearch = document.querySelector('#js-input-search');
   this.burgerIcon = document.querySelector('#js-icon-burger');
   this.burgerMenu = document.querySelector('#js-menu');
   this.cartTotal = document.querySelector('#js-total-cart');
   this.test = document.querySelector('#js-test');
   this.cartBtnHide = document.querySelector('.cart-added-list');
   this.totalSum = document.querySelector('#js-total-sum');
   this.form = document.querySelector('#js-form');
   this.orderBtn = document.querySelector('#js-order-btn');
   this.orderSuccess = document.querySelector('#js-success');
   this.orderFormWrap = document.querySelector('#js-form-wrap');

   // Змінна для timeout
   this.idTimeout = 0;

   // Масив обранних товарів
   this.cart = this.getLocal('cart');

   // Посилання для api
   this.apiLink = 'https://64fecbcdf8b9eeca9e291654.mockapi.io/';
   this.apiCatalog = this.apiLink + 'catalog';
   this.apiCatalogHotOffer = this.apiCatalog + '?hotoffer=yes';
   this.apiSearch = this.apiCatalog + '?search=';
   this.apiCategories = this.apiLink + 'categories';

   // Виводимо всі товари в html
   this.diplayProducts = (array, viewInThisBlock = this.catalogMain) => {

      // Перевірка на існування
      if (viewInThisBlock) {

         // Очищуємо карточки перед виводом
         viewInThisBlock.innerHTML = '';

         // Перевіряємо масив на пустоту
         if (array.length == 0) {

            // Виводимо повідомлення NO RESULTS
            viewInThisBlock.innerHTML = `<h2 class="no-result">No products found</h2>`;

         } else {

            // Перебираємо товари для виводу
            array.forEach(({ img, title, price, oldprice, hotoffer, catid, id }) => {

               // Виводимо товари 
               viewInThisBlock.insertAdjacentHTML('beforeend', `<div class="card-product">
                                                   <div class="card-product__img-hold d-flex-center">
                                                      <img src="img/catalog/${img}" alt="" class="card-product__img js-product-img">
                                                   </div>
                                                   <div class="card-product__text-hold">
                                                      <a href="#" class="card-product__title-link">${title}</a>
                                                      <span class="card-product__price">${price} USD <small>${oldprice} USD</small></span>
                                                      <a href="#" class="card-product__btn-add js-icon-cart" data-id="${id}" data-title="${title}" data-price="${price}" data-img="${img}" data-count="1"><svg class='icon icon-cart'><use xlink:href='#icon-cart-add'></use></svg></a>
                                                   </div>
                                                </div>`)
            });
         }
      }
   }


   // Вивід всіх категорій в html
   this.diplayCategory = (array) => {

      //Перевірка на існування
      if (this.category) {

         //Виводимо категорії
         this.category.insertAdjacentHTML('beforeend', `<a href="#" class="dropdown-item">Reset selection</a>`)

         // Перебираємо категорії
         array.forEach(({ id, title }) => {

            //Виводимо категорії
            this.category.insertAdjacentHTML('beforeend', `<a href="${id}" class="dropdown-item">${title}</a>`)

         })
      }
   };


   // Підраховуємо та виводимо цифрою загальну кіл-ть товару
   this.displayCountProducts = (array) => {

      // Виводимо цифру в html
      if (this.countProducts)
         this.countProducts.innerHTML = array.length;
   }


   // Вивід товарів до каталогу
   this.viewPorducts = () => {

      // Витягуємо товари з бази даних
      fetch(this.apiCatalog)
         .then(res => res.json())
         .then((products) => {

            // Перебираємо товари для виводу
            this.diplayProducts(products);

            // Оновлюємо кількість товарів
            this.displayCountProducts(products);

         })
   }


   // Вивід акційних товарів
   this.viewPorductsHot = () => {

      // Витягуємо товари з бази даних
      fetch(this.apiCatalogHotOffer)
         .then(res => res.json())
         .then((products) => {

            // Отримуємо елемент блоку з акційними пропозиціями
            const hotOffer = document.querySelector('.js-hotoffers');

            // Перебираємо товари для виводу
            this.diplayProducts(products, hotOffer);

         })
   }


   // Вивід категорій
   this.viewCategories = () => {

      // Витягуємо категорії з бази даних
      fetch(this.apiCategories)
         .then(res => res.json())
         .then((categories) => {

            // Виводимо категорії
            this.diplayCategory(categories);
         })
   }


   // Виводимо товари по певній категорії
   this.setCategoryProducts = (e) => {

      // Забороняємо стандратний функціонал html
      e.preventDefault();

      // Зберігаємо результат кліку
      const el = e.target;

      // Дістаємо id категорії
      const idCategory = el.getAttribute('href');

      // Витягуємо товари з бази даних
      fetch(this.apiCatalog + '?catid=' + idCategory)
         .then(res => res.json())
         .then((products) => {

            // Виводим товари
            this.diplayProducts(products);

            // Оновлюємо кількість товарів
            this.displayCountProducts(products);

         })
   }


   // Добавляємо товар в корзину
   this.addNewProduct = (el) => {

      // Збираємо дані про товар
      const product = el.dataset;

      if (!this.isProductInCart(this.cart, product.id)) {

         // Добавляємо товар до масива
         this.cart.push(product);

         // Виводимо товари в корзину
         this.viewCartProducts();

         // Оновлюємо число доданих товарів в корзині
         this.setCountCartProducts();
      }

   }


   // Функція виводу кількості добавлених товарів
   this.setCountCartProducts = () => {

      // Створюємо змінну де буде зберігатись кіл-ть доданних товарів
      this.totalItemCount = 0;

      // Перебираю масив об'єктів корзини, щоб отримати count
      for (this.item of this.cart) {

         // Підсумовую загальну кількість товарів
         this.totalItemCount += parseInt(this.item.count);
      }

      //Виводимо результат в html
      this.cartProductNum.forEach((el) => {
         el.innerHTML = this.totalItemCount;
      })
   }


   // Слідкуємо за зміною кіл-ті товарів в корзинці
   this.onChangeProductQuantity = () => {

      //отримуємо атрибут із елемента (plus or minus)
      this.btnTypeVal = this.el.getAttribute('data-type');

      //отримуємо атрибут з кнопки, щоб зв'язати з інпутом
      this.dataInputVal = this.el.getAttribute('data-input');

      // Зберігаю необхідний інпут
      this.input = document.querySelector(this.dataInputVal);

      // Отримуємо поточне значення інпута
      this.count = parseInt(this.input.value);

      if (this.btnTypeVal === 'plus') {
         this.input.value++;
      }

      if (this.btnTypeVal === 'minus' && this.count > 1) {
         this.input.value--;
      }

      // Ключ в масиві cart
      this.cartIndex = this.el.getAttribute('data-index');

      // Оновлювати цифру в масиві віносно товару
      this.cart[this.cartIndex].count = this.input.value;

      // Зберігати корзину в localstorage
      this.saveLocal('cart', this.cart);

      // Виводимо кількість добавлених товарів
      this.setCountCartProducts();
   }


   // Виводимо товар в корзину-sm
   this.viewCartProducts = () => {

      // Очищуємо від старого результату
      this.displayProductCart.innerHTML = '';

      // Зберігаємо масив до localstorage
      this.saveLocal('cart', this.cart);

      // Перевіряємо масив cart на пустоту
      if (this.cart == 0) {

         // Виводимо повідомлення NO RESULTS
         this.displayProductCart.innerHTML = `<h2 class="no-result no-result-cart-sm">Cart is empty</h2>`;
      } else {
         this.cart.forEach(({ id, title, img, price, count }, index) => {
            this.displayProductCart.insertAdjacentHTML('beforeend', `<div class="cart-added-list__item">
                                                                           <button class="cart-added-list__item-btn-delete btn-light js-btn-delete" data-index="${index}"><svg class='icon icon-close'>
                                                                                 <use xlink:href='#icon-close'></use>
                                                                              </svg></button>
                                                                           <img src="img/catalog/${img}" alt="" class="cart-added-list__item-img">
                                                                           <p class="cart-added-list__item-text-hold">
                                                                              <a href="#" class="cart-added-list__item-title-link">${title}</a>
                                                                              <span class="cart-added-list__item-meta-list">
                                                                                 <span class="cart-added-list__item-meta">${price} USD</span>
                                                                              </span>
                                                                           </p>
                                                                           <input type="text" class="cart-added-list__item-count js-input" placeholder="0" value="${count}" id="input-count-${id}" readonly>
                                                                           <button class="cart-added-list__item-btn-plus btn-light js-count" data-type="plus" data-input="#input-count-${id}" data-index="${index}"></button>
                                                                           <button class="cart-added-list__item-btn-minus btn-light js-count" data-type="minus" data-input="#input-count-${id}" data-index="${index}"></button>
                                                                        </div>`)
         })
      }
   }


   // Виводимо інфо замовлення в корзину
   this.viewCartTotal = () => {

      // Очищуємо від старого результату
      if (this.cartInfoTotal) {
         this.cartInfoTotal.innerHTML = '';

         // Перевіряємо масив cart на пустоту
         if (this.cart == 0) {

            // Виводимо повідомлення NO RESULTS
            this.test.innerHTML = ` <div class="no-result no-result-cart d-flex-center">Ups... Your cart is empty now <br>
                                       <div class="cart-empty-icon-holder">
                                          <img src="./img/favicon/shopping-cart.png" alt="shopping cart" class="cart-empty-icon">
                                       </div>
                                       <a class="no-result no-result--back" href="index.html">Come back for more</a>
                                    </div>`;
            this.orderBtn.disabled = true;
            this.orderBtn.style.backgroundColor = '#b4b4b4';
         } else {

            // Заглушка для сумми
            this.summPrice = 0;

            this.cart.forEach(({ id, title, img, price, count }, index) => {

               // Підраховуємо сумму замовлення
               this.summPrice += (count * price);

               this.cartInfoTotal.insertAdjacentHTML('beforeend', `<div class="cart-ordered-list__item">
                                                                     <div class="cart-ordered-list__item-img-hold">
                                                                        <img src="img/catalog/${img}" alt="${title}" class="cart-ordered-list__item-img">
                                                                     </div>
                                                                     <div class="cart-ordered-list__item-text-hold">
                                                                        <div class="cart-ordered-list__item-title">${title}</div>
                                                                        <div class="cart-ordered-list__item-price">amount ${count}</div>
                                                                        <div class="cart-ordered-list__item-price">${price} USD</div>
                                                                     </div>
                                                                  </div>`)
            })

            // Виводимо сумму в html
            this.totalSum.insertAdjacentHTML('beforeend', `Total: ${this.summPrice} USD`)
         }

      }

   }


   // Слідкую за натиском по корзинці в картці товару
   this.onPressCartBtn = (e) => {
      e.preventDefault();

      // Поточний елемент по якому був клік
      let el = e.target;

      // Перевіряємо чи елемент по якому ми клікнули є use
      if (el.nodeName == 'use')
         el = el.parentNode.parentNode;

      // Перевіряємо чи елемент по якому ми клікнули є svg
      if (el.nodeName == 'svg')
         el = el.parentNode;

      // Перевіряєо чи клік був по потрібно нам елементі
      if (el.classList.contains('js-icon-cart')) {

         // Додаємо обраний товар в масив та виводимо його в корзинку
         this.addNewProduct(el);
      }
   }


   // Функція видалення товару з корзини
   this.removeProductFromCart = (item) => {

      // Отримуємо id товару, який треба видалити
      this.idToDelete = item.dataset.index;

      // Видаляємо товар з масива cart
      this.cart.splice(this.idToDelete, 1);

      // Виводимо товари
      this.viewCartProducts();

      // Оновлюємо число товарів в корзині
      this.setCountCartProducts();

   }


   // Функція для обробок кліків на елементі корзини
   this.handleProductCartClick = (event) => {
      // Обробник зміни кіл-ті товару
      // Поточний елемент по якому був клік
      this.el = event.target;
      // Перевіряєо чи клік був по кнопкам +- кіл-ті товару
      if (this.el.classList.contains('js-count')) {
         // Якщо так, запускаю функцію зміни кіл-ті товару
         this.onChangeProductQuantity();
      }

      // Обробник видалення товару
      // Поточний елемент по якому був клік
      let item = event.target;
      // Перевіряємо чи елемент по якому ми клікнули є use
      if (item.nodeName == 'use')
         item = item.parentNode.parentNode;

      // Перевіряємо чи елемент по якому ми клікнули є svg
      if (item.nodeName == 'svg')
         item = item.parentNode;

      // Перевіряєо чи клік був по потрібно нам елементі
      if (item.classList.contains('js-btn-delete')) {

         // Видаляю обраний товар
         this.removeProductFromCart(item);
      }

   }


   // Звертаємось до апі пошуку товарів
   this.searchFetchProducts = (inputValue) => {

      // Витягуємо товари з бази даних
      fetch(this.apiSearch + inputValue)
         .then(res => res.json())
         .then((products) => {

            // Перебираємо товари для виводу
            this.diplayProducts(products);

            // Оновлюємо кількість товарів
            this.displayCountProducts(products);

         })
   }


   // Пошук товарів при події введеня користувачем значення
   this.searchProducts = (e) => {

      // Спочатку видаляємо попередній таймаут, якщо він існує
      clearTimeout(this.idTimeout);

      this.idTimeout = setTimeout(() => {

         // Витягуємо значення з поля пошуку
         const inputValue = e.target.value;

         // Викликаємо функцію звернення до арі
         this.searchFetchProducts(inputValue);
      }, 700)
   }


   // Функція відправки листа до клієнта
   this.sendEmail = (someData) => {
      // Робимо запит на сервер
      fetch('https://api.inderio.com/send-email', {
         method: 'POST',
         body: someData
      })
         .then(response => response.json())
         .then(result => {


            this.orderFormWrap.classList.add('hide');
            this.orderSuccess.classList.remove('hide');
            console.log("result: ", result);
            console.log('success')
         });
   }


   if (this.form) {

      // Вішаємо на форму подію відправки данних на ел пошту
      this.form.onsubmit = (event) => {
         event.preventDefault();

         // Отримую дані з форми
         this.formData = new FormData(this.form);

         // Оголошую пустий об'єкт
         this.data = {};

         // Наповнюю пустий об'єкт даними з форми
         this.formData.forEach((el, key) => {
            this.data[key] = el;
         })

         this.formData.append('message', this.emailUserTemplate());

         // Викликаємо функцію this.sendEmail та передаємо об'єкт formData як аргумент
         this.sendEmail(this.formData);
      }

   }


   // Шаблон для користувача
   this.emailUserTemplate = () => {
      // Роблю заглушку, що буде наповнюватись кожною ітерацією корзини
      this.cartList = '';

      this.cart.forEach(({ img, title, price, oldprice, hotoffer, catid, id, count }) => {
         this.cartList += ` <table class="column" style="border-spacing: 0; width: 100%; max-width: 300px; display: inline-block; vertical-align: top; text-align: left;"
                              width="100%" valign="top" align="left">
                              <tr>
                                 <td class="padding" style="padding: 15px;">
                                    <table class="content" style="border-spacing: 0; font-size: 15px; padding: 0 5px;">
                                       <tr>
                                          <td style="padding: 0;">
                                             <div class="cart-ordered-list__item-img-hold">
                                                <img src="https://64fecbcdf8b9eeca9e291654.mockapi.io/catalog${img}" alt=""
                                                   class="cart-ordered-list__item-img" width="100"
                                                   style="border: 0; max-width: 100px;">
                                             </div>
                                          </td>
                                       </tr>
                                       <tr>
                                          <td style="padding: 0;">
                                             <div class="cart-ordered-list__item-text-hold">
                                                <div class="cart-ordered-list__item-title">${title}</div>
                                                <div class="cart-ordered-list__item-price">amount ${count}</div>
                                                <div class="cart-ordered-list__item-price">${price} USD</div>
                                             </div>
                                          </td>
                                       </tr>
                                    </table>
                                 </td>
                              </tr>
                           </table>`
      });


      return `<!DOCTYPE html>
               <html lang="en">
               <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <title>Document</title>
               </head>
               <body style="margin: 0; padding: 0; background-color: #cccccc;">
                  <center class="wrapper" style="width: 100%; table-layout: fixed; background-color: #cccccc; padding: 20px 0;">
                     <table class="main" width="100%" style="background-color: #fff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: Poppins, sans-serif; color: #171a1b;" bgcolor="#fff">
                        <!-- LOGO SECTION -->
                        <tr>
                           <td style="padding: 14px 0 4px;">
                              <table width="100%" style="border-spacing: 0;">
                                 <tr>
                                    <td class="two-columns" style="padding: 0; text-align: center; font-size: 0;" align="center">
                                       <table class="column" style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;" width="100%" valign="baseline" align="center">
                                          <tr>
                                             <td style="padding: 0 85px 10px;">
                                                <a href="index.html" target="_blank" class="logo" style="color: #363837; font-size: 28px; font-weight: 700; line-height: 1.2; text-decoration: none;">I-happy</a>
                                             </td>
                                          </tr>
                                       </table>
                                       <table class="column" style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;" width="100%" valign="baseline" align="center">
                                          <tr>
                                             <td style="padding: 15px 92px;">
                                                <a href="https://www.facebook.com/" target="_blank" style="padding-right: 10px;">
                                                   <img src="https://img.icons8.com/?size=50&id=118467&format=png" alt="Icon facebook" width="20" style="border: 0;"></a>
                                                <a href="https://www.instagram.com/" target="_blank" style="padding-right: 10px;">
                                                   <img src="https://img.icons8.com/?size=50&id=32309&format=png" alt="Icon instagram" width="20" style="border: 0;"></a>
                                                <a href="#" style="padding-right: 10px;">
                                                   <img src="https://img.icons8.com/?size=50&id=8824&format=png" alt="Icon twitter" width="20" style="border: 0;"></a>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                        <!-- BANNER IMG -->
                        <tr>
                           <td style="padding: 0;">
                              <a href="#">
                                 <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqL8-ndPrE10m8o45Og30DmHP2lmO_-ywaKVkQ9KDeHZHE_Rnioqr2e1pO8aSxBRfICFE&usqp=CAU" alt="Banner img" width="600" style="border: 0; max-width: 100%;"></a>
                              <h2 class="title" style="text-align: center;">Hello! Thanks for choosing us!<br> Here is your order
                                 details:</h2>
                           </td>
                        </tr>
                        <!-- HERE WILL BE ORDER DATA -->
                            ${this.cartList}
                        <tr>
                           <td style="padding: 0; background-color: #ffff;" bgcolor="#ffff">
                              <table width="100%" style="border-spacing: 0;">
                                 <tr>
                                    <td style="text-align: left; padding: 10px; color: #000000;">
                                       <h3>Total: ${this.summPrice} UAH</h3>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>





                        <!-- TWO COLUMN SECTION (new product advert)-->
                        <tr>
                           <td style="padding: 0; background-color: #f4f4f4; color: #171a1b;" bgcolor="#f4f4f4">
                              <table width="100%" style="border-spacing: 0;">
                                 <tr>
                                    <td class="two-columns last" style="text-align: center; font-size: 0; padding: 30px 0;" align="center">
                                       <table class="column" style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;" width="100%" valign="baseline" align="center">
                                          <tr>
                                             <td class="padding" style="padding: 20px;">
                                                <table class="content" style="border-spacing: 0; font-size: 15px; line-height: 20px; text-align: left;" align="left">
                                                   <tr>
                                                      <td style="padding: 0;">
                                                         <a href="#">
                                                            <img src="https://github.com/dianakoliada/portfolio/blob/main/e-commerce-js/img/catalog/15.png?raw=true" alt="Product" width="260" style="border: 0; max-width: 260;">
                                                         </a>
                                                      </td>
                                                   </tr>
                                                </table>
                                             </td>
                                          </tr>
                                       </table>
                                       <!-- end of column -->
                                       <table class="column" style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;" width="100%" valign="baseline" align="center">
                                          <tr>
                                             <td class="padding" style="padding: 20px;">
                                                <table class="content" style="border-spacing: 0; font-size: 15px; line-height: 20px; text-align: left;" align="left">
                                                   <tr>
                                                      <td style="padding: 0;">
                                                         <p style="font-weight: bold; font-size: 18px;">Hot offers!</p>
                                                         <p style="padding-bottom: 16px;">
                                                            Description.... Lorem ipsum dolor sit, amet
                                                            consectetur adipisicing elit. Repudiandae, consectetur?
                                                         </p>
                                                         <a href="index.html" target="_blank" class="button" style="background-color: #ffffff; color: #171a1b; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold;">More</a>
                                                      </td>
                                                   </tr>
                                                </table>
                                             </td>
                                          </tr>
                                       </table>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                        <!-- FOOTER SECTION -->
                        <tr>
                           <td style="padding: 0; background-color: #ffff;" bgcolor="#ffff">
                              <table width="100%" style="border-spacing: 0;">
                                 <tr>
                                    <td style="text-align: center; padding: 45px 20px; color: #000000;" align="center">
                                       <a href="index.html" target="_blank" class="logo" style="color: #363837; font-size: 28px; font-weight: 700; line-height: 1.2; text-decoration: none;">I-happy</a>
                                       <p style="padding: 10px;">We help to improve your life</p>
                                       <p style="padding: 10px;">Address info</p>
                                       <a href="https://www.facebook.com/" target="_blank" style="padding-right: 10px;">
                                          <img src="https://img.icons8.com/?size=50&id=118467&format=png" alt="Icon facebook" width="20" style="border: 0;"></a>
                                       <a href="https://www.instagram.com/" target="_blank" style="padding-right: 10px;">
                                          <img src="https://img.icons8.com/?size=50&id=32309&format=png" alt="Icon instagram" width="20" style="border: 0;"></a>
                                       <a href="#" style="padding-right: 10px;">
                                          <img src="https://img.icons8.com/?size=50&id=8824&format=png" alt="Icon twitter" width="20" style="border: 0;"></a>
                                       <p style="padding: 10px;">SUBSCRIBE</p>
                                    </td>
                                 </tr>
                              </table>
                           </td>
                        </tr>
                     </table>
                  </center>
               </body>
               </html> `
   }


   // Створюємо метод об'єкту який запускає весь функціонал 
   this.init = () => {

      // Отримуємо get parameters при завантаженні
      this.getUrlParams();

      // Виводимо товари при завантаженні
      this.viewPorducts();

      // Виводимо товари при завантаженні
      this.viewPorductsHot();

      // Виводимо категорії при завантаженні
      this.viewCategories();

      // Виводимо товари в корзину-sm
      this.viewCartProducts();

      // Виводимо інфо замовлення в корзину
      this.viewCartTotal();

      // Слідкуємо за кліком по категоріях
      if (this.category)
         this.category.onclick = this.setCategoryProducts;

      // Слідкуємо за кліком по картці продукту
      this.catalog.forEach((el) => {
         el.onclick = this.onPressCartBtn;
      })

      // Слідкую за обробниками подій
      this.displayProductCart.onclick = this.handleProductCartClick;

      // Оновлюємо кількість доданих товарів в корзину при завантаженні сторінки
      this.setCountCartProducts();

      // Ховаємо і показуємо корзину
      this.cartBtn.onclick = () => this.displayProductCart.classList.toggle('show');

      // Ховаємо і показуємо категорії
      if (this.categoryBtn)
         this.categoryBtn.onclick = () => this.category.classList.toggle('show');

      // Ховаємо і показуємо меню-бургер
      if (this.burgerIcon)
         this.burgerIcon.onclick = () => this.burgerMenu.classList.toggle('show');

      // Слідкуємо за полем пошуку
      if (this.inputSearch)
         this.inputSearch.oninput = this.searchProducts;

      // Ховаємо корзинку на сторінці замовлення
      if (this.isCorrectPage('order')) {
         this.cartBtnHide.classList.add('hide');
      }
   }
}

// Ініціалізуємо об'єкт
const shopInit = new shop();

// Запускаємо перший метод в якому і буде збиратися весь функціонал
shopInit.init();

