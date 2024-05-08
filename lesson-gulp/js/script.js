document.querySelector("#js-btn-burger").onclick = function () {
  document.querySelector("#js-menu-mobile").classList.toggle("active");
};

// Показуємо і приховуємо добавлені товари
document.querySelector('#js-cart-added-btn').onclick = () => document.querySelector('#js-cart-added-list').classList.toggle('show');

function isUndefined(data) { return data == undefined }
function isTypeExist(type, needType) { return isUndefined(type) || type != needType }

// Перевіряємо щоб в інпут вибору кількості товарів були лише числа
const onTypeHandler = (event => {
  if (!parseInt(event.key)) {
    event.preventDefault();
  }
})








