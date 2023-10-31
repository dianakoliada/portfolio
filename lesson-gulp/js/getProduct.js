// Як витягувати значення з GET параметрів ++
// Зробити окрему функцію, яка буде витягувати єдиний товар по id++
// ПЕРЕВІРКИ++
function getProduct() {

    // Диструктуризація об'єкта
    const { id, type } = getUrlParams();

    // Робимо перевірку на type = product
    if (isTypeExist(type, 'product'))
        return;

    // Перевірка чи існує id товару
    if (isUndefined(id))
        window.location.href = "home.html";

    // Витягуємо елемент в який будемо поміщати товар
    const productCard = document.querySelector('#productCard');

    // Звертаємося до api потрібного товару
    fetch('https://dummyjson.com/products/' + id)
        .then(res => res.json())
        .then(res => {

            // Диструктуризація масива
            const { id, title, price, category, stock, thumbnail } = res;

            productCard.insertAdjacentHTML(
                'afterbegin',
                `<div class="product-card-block-left">
                    <div class="product-card-holder-img">
                        <img src=${thumbnail} alt=${title} class="product-card-img">
                    </div>
                </div>
                <div class="product-card-block-right flex">
                    <div class="product-card-info">
                        <div class="product-card-info-holder">
                            <h1 class="product-card-info-title title">
                                ${title}
                            </h1>
                            <p class="product-list-card-price text-special js-currency" data-price="${price}">
                                Price:
                                <span class="text info-text">${price} &#x20b4;</span>
                            </p>
                            <p class="text-special">
                                Article:
                                <span class="text info-text">${stock}</span>
                            </p>
                            <p class="text-special">
                                Category:
                                <span class="text info-text">${category}</span>
                            </p>
                            <p class="text-special">
                                Availability:
                                <span class="text-special--success info-text">Is available</span>
                            </p>
                        </div>
                        <div class="product-card-basket-form flex">
                            <p class="product-card-form-input">
                                <span class="text form-text">-</span>
                                <span class="text form-text">1</span>
                                <span class="text form-text">+</span>
                            </p>
                            <a href="#" class="product-card-form-btn text-special flex flex-center">
                                Add to basket
                            </a>
                        </div>
                    </div>
                </div>`
            )
        })


};

getProduct();





