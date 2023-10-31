function getUrlParams() {

   // Отримання URL - адреси сторінки:
   const url = window.location.search;  //url:  ?id=2&type=product
   console.log("url: ", url);
   // const url = window.location.href;  //url:  file:///D:/frontend_self/lesson-gulp/html/product.html?id=2&type=product

   // Перевірка на пустоту
   if (url == '')
      return {};

   //Розділення URL на частини:
   const urlParts = url.split('?');

   //Отримання рядка з GET-параметрами:
   const queryParams = urlParts[1];

   //Розділення рядка з GET-параметрами на окремі параметри:
   const params = queryParams.split('&');

   //Створення об'єкта для зберігання значень параметрів:
   const paramsObj = {};

   // Проходження через кожен параметр і зберігання його значення в об'єкті
   for (let i = 0; i < params.length; i++) {
      const param = params[i].split('=');
      const paramName = decodeURIComponent(param[0]);
      const paramValue = decodeURIComponent(param[1]);
      paramsObj[paramName] = paramValue;
   }

   // Повертаємо параметри
   return paramsObj;
}


// Загальна функція для перевірки коректності сторінки
function isCorrectPage(param) {

   // Диструктуризація об'єкта
   const { page } = getUrlParams();

   // Робимо перевірку на type = product
   return page == param;
}