function showOrderCart() {

   // Перевіряємо чи ми на правильній сторінці
   if (isCorrectPage('cart-purchase')) {

      const emptyCart = document.querySelector('#emptyCart');
      const fullCart = document.querySelector('#fullCart');
      const viewCartPurchase = document.querySelector('#view-cart-purchase');

      // Якщо корзина заповненна, робимо деструктуризацію елементів, вивозимо елементи в html

      if (cart.length == 0) {

         // Виводимо Корзина пуста
         fullCart.classList.add('hide');
         emptyCart.classList.remove('hide');

      } else {

         // Виводимо Корзина не пуста
         fullCart.classList.remove('hide');
         emptyCart.classList.add('hide');

         // Заглушка для сумми
         let summPrice = 0;

         // Виводимо товари
         cart.forEach((product) => {

            // Диструктуризація масива
            const { id, title, price, category, stock, thumbnail, count } = product;

            // Підраховуємо сумму замовлення
            summPrice = summPrice + (count * price);

            // Виводимо товари в html
            viewCartPurchase.insertAdjacentHTML('beforeend', `<div class="cart-purchase-card">
          <div class="cart-purchase-card-img-holder">
            <img src="${thumbnail}" alt="${title}" class="cart-purchase-card-img">
          </div>
          <div class="cart-purchase-card-info-holder">
            <p class="cart-purchase-card-info cart-empty-text">${title}</p>
            <p class="cart-purchase-card-info cart-empty-text"><span class="cart-purchase-info">quantity:</span> ${count}</p>
            <p class="cart-purchase-card-info cart-empty-text"><span class="cart-purchase-info">price:</span> ${price} грн</p>
            <p class="cart-purchase-card-info"><span class="cart-purchase-info">sum:</span> ${count * price} грн</p>
          </div>
        </div>`);
         })

         // Виводимо сумму в html
         document.querySelector('#total-price').insertAdjacentHTML('beforeend', `Total price: ${summPrice} грн.`)

         // Ховаємо маленьку корзину
         document.getElementById('js-cart-added-btn').classList.add('hide');

      }
   }
}

showOrderCart();


function sendEmail(formData) {
   // Робимо запит на сервер
   fetch('https://api.inderio.com/send-email', {
      method: 'POST',
      body: formData
   })
      .then(response => response.json())
      .then(result => {
         console.log("result: ", result);
         console.log('success')
      });
}

const form = document.getElementById('form-js');

//вішаємо на форму подію відправки данних на ел пошту
form.onsubmit = function (event) {
   event.preventDefault();


   //отримаю дані з форми
   const formData = new FormData(form);

   //оголошую пустий об'єкт
   const data = {};

   //наповнюю пустий об'єкт данними з форми
   formData.forEach((el, key) => {
      data[key] = el;
   })

   //дадаю ключик "message" із властивістю мого html шаблона для клієнта, тоді воно відправиться після натиску клієнтом на кнопку
   formData.append('message', emailTemplateForUser());

   //відправляю лист на пошту клієнта
   sendEmail(formData);
}


function emailTemplateForUser() {

   //роблю заглушку (буде наповнюватись кожної ітерації по корзині)
   let cartProducts = '';

   cart.forEach(({ title, price, description, thumbnail }) => {
      cartProducts += `<table class="column"
                           style="border-spacing: 0; width: 100%; max-width: 150px; display: inline-block; vertical-align: top; text-align: left;"
                           width="100%" valign="top" align="left">
                           <tr>
                              <td class="padding" style="padding: 15px;">

                                 <table class="content" style="border-spacing: 0; font-size: 15px; padding: 0 5px;">
                                    <tr>
                                       <td style="padding: 0;">
                                          <a href="#"><img
                                                src="${thumbnail}"
                                                alt="${title}" width="100" style="border: 0; max-width: 100px;"></a>
                                       </td>
                                    </tr>
                                    <tr>
                                       <td style="padding: 0;">
                                          <p style="font-weight: bold;font-size: 17px;">${title}</p>
                                          <p style="font-weight: normal;font-size: 17px;">${price} UAH</p>
                                       </td>
                                    </tr>
                                 </table>

                              </td>
                           </tr>
                        </table>`

   })

   return ` <!DOCTYPE html>
<html lang="en">

<head>
   <meta charset="UTF-8">
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
   <title>Document</title>
</head>

<body style="margin: 0; padding: 0; background-color: #cccccc;">

   <center class="wrapper" style="width: 100%; table-layout: fixed; background-color: #cccccc; padding-bottom: 60px;">

      <table class="main" width="100%"
         style="background-color: #fff; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; font-family: Poppins, sans-serif; color: #171a1b;"
         bgcolor="#fff">

         <!-- TOP BORDER -->
         <tr>
            <td height="15" style="padding: 0; background-color: rgba(193, 220, 220, 1);"
               bgcolor="rgba(193, 220, 220, 1)"></td>
         </tr>

         <!-- LOGO SECTION -->
         <tr>
            <td style="padding: 14px 0 4px;">
               <table width="100%" style="border-spacing: 0;">

                  <tr>
                     <td class="two-columns" style="padding: 0; text-align: center; font-size: 0;" align="center">

                        <table class="column"
                           style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;"
                           width="100%" valign="baseline" align="center">
                           <tr>
                              <td style="padding: 0 52px 10px;">
                                 <a href="#">
                                    <img
                                       src="https://github.com/dianakoliada/lesson-gulp/blob/main/src/img/logo.png?raw=true"
                                       alt="Logo" width="120" title="Logo" style="border: 0;">
                                 </a>
                              </td>
                           </tr>
                        </table>

                        <table class="column"
                           style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;"
                           width="100%" valign="baseline" align="center">

                           <tr>
                              <td style="padding: 10px 82px;">
                                 <a href="#" style="padding-right: 10px;">
                                    <img src="https://img.icons8.com/?size=50&id=118467&format=png" alt="Icon facebook"
                                       width="20" style="border: 0;"></a>
                                 <a href="#" style="padding-right: 10px;">
                                    <img src="https://img.icons8.com/?size=50&id=32309&format=png" alt="Icon instagram"
                                       width="20" style="border: 0;"></a>
                                 <a href="#" style="padding-right: 10px;">
                                    <img src="https://img.icons8.com/?size=50&id=8824&format=png" alt="Icon twitter"
                                       width="20" style="border: 0;"></a>
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
                  <img
                     src="https://github.com/dianakoliada/lesson-gulp/blob/main/src/img/products/plant-advert.jpg?raw=true"
                     alt="Banner img" width="600" style="border: 0; max-width: 100%;"></a>
               <h3 class="title" style="text-align: center;">Hello! Thanks for choosing us!<br> Here is your order
                  details:</h3>
            </td>
         </tr>

         <!-- HERE WILL BE ORDER DATA -->
         <tr>
            <td style="padding: 0;">
               <table width="100%" style="border-spacing: 0;">
                  <tr>
                     <td class="some-columns" style="text-align: center; font-size: 0; padding: 15px 25px;"
                        align="center">

                        <!-- start of column -->
                        ${cartProducts}
                        <!-- end of column -->

                     </td>
                  </tr>
               </table>
            </td>
         </tr>
         <!-- TWO COLUMN SECTION (new product advert)-->
         <tr>
            <td style="padding: 0; background-color: rgba(193, 220, 220, 1); color: #171a1b;"
               bgcolor="rgba(193, 220, 220, 1)">
               <table width="100%" style="border-spacing: 0;">

                  <tr>
                     <td class="two-columns last" style="text-align: center; font-size: 0; padding: 30px 0;"
                        align="center">

                        <table class="column"
                           style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;"
                           width="100%" valign="baseline" align="center">
                           <tr>
                              <td class="padding" style="padding: 20px;">

                                 <table class="content"
                                    style="border-spacing: 0; font-size: 15px; line-height: 20px; text-align: left;"
                                    align="left">
                                    <tr>
                                       <td style="padding: 0;">
                                          <a href="#">
                                             <img
                                                src="https://github.com/dianakoliada/lesson-gulp/blob/main/src/img/products/edible/plant-1.jpg?raw=true"
                                                alt="Product" width="260" style="border: 0; max-width: 260;">
                                          </a>
                                       </td>
                                    </tr>
                                 </table>

                              </td>
                           </tr>
                        </table>
                        <!-- end of column -->

                        <table class="column"
                           style="border-spacing: 0; width: 100%; max-width: 290px; display: inline-block; vertical-align: baseline; text-align: center;"
                           width="100%" valign="baseline" align="center">
                           <tr>
                              <td class="padding" style="padding: 20px;">

                                 <table class="content"
                                    style="border-spacing: 0; font-size: 15px; line-height: 20px; text-align: left;"
                                    align="left">
                                    <tr>
                                       <td style="padding: 0;">
                                          <p style="font-weight: bold; font-size: 18px;">The new product!</p>
                                          <p style="padding-bottom: 16px;">
                                             Description.... Lorem ipsum dolor sit, amet
                                             consectetur adipisicing elit. Repudiandae, consectetur?
                                          </p>
                                          <a href="#" class="button"
                                             style="background-color: #ffffff; color: #171a1b; text-decoration: none; padding: 12px 20px; border-radius: 5px; font-weight: bold;">Go
                                             to shop</a>
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
                     <td style="text-align: center; padding: 45px 20px; color: #black;" align="center">

                        <a href="#">
                           <img src="https://github.com/dianakoliada/lesson-gulp/blob/main/src/img/logo.png?raw=true"
                              alt="Logo" width="180" style="border: 0;">
                        </a>
                        <p style="padding: 10px;">We help you find your dream plant ♡</p>
                        <p style="padding: 10px;">11111 11111 Address</p>
                        <a href="#" style="padding-right: 10px;">
                           <img src="https://img.icons8.com/?size=50&id=118467&format=png" alt="Icon facebook"
                              width="20" style="border: 0;"></a>
                        <a href="#" style="padding-right: 10px;">
                           <img src="https://img.icons8.com/?size=50&id=32309&format=png" alt="Icon instagram"
                              width="20" style="border: 0;"></a>
                        <a href="#" style="padding-right: 10px;">
                           <img src="https://img.icons8.com/?size=50&id=8824&format=png" alt="Icon twitter" width="20"
                              style="border: 0;"></a>
                        <p style="padding: 10px;">SUBSCRIBE</p>
                     </td>
                  </tr>

               </table>
            </td>
         </tr>


      </table>

   </center>

</body>

</html>`

}


















