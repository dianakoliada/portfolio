//Витягуємо всі товари з бази даних

function getProducts() {
    // Витягуємо елемент в який будемо поміщати товари
    const productList = document.querySelector('#productList');

    if (productList == null) {
        return;
    }

    // Звертаємося то api всіх товарів
    fetch('https://dummyjson.com/products/')
        .then(res => res.json())
        .then(res => {
            // console.log("res: ", res);

            // Диструктуризація масива
            const { products } = res;

            // Виводимо товари на сторінку
            products.forEach(el => {

                // Диструктуризація товару
                const { id, title, price, category, stock, thumbnail } = el;

                // Виводимо товари в каталог
                productList.insertAdjacentHTML(
                    'beforeend',
                    `<div class="products-list-card catalogue-list-card">
                        <div class="products-list-card-img-holder catalogue-list-card-img-holder">
                            <a href="../html/product.html?id=${id}&type=product" class="products-list-card-img-link catalogue-list-card-img-link" id="js-card">
                                <img src=${thumbnail} alt=${title} class="catalogue-list-card-img">
                            </a>
                            <a href="#" class="js-add-product btn btn-add-product" data-id="${id}" data-title="${title}" data-price="${price}" data-thumbnail="${thumbnail}" data-count="1">
                                +
                            </a>
                        </div>
                        <div class="products-list-card-content catalogue-list-card-content">
                            <p class="catalogue-list-title text-special">${title}</p>
                            <p class="products-list-card-price text-special catalogue-list-price js-currency" data-price="${price}">
                                Price:
                                <span class="text">${price} &#x20b4;</span>
                            </p>
                            <p class="catalogue-list-category text-special">
                                Category:
                                <span class="text">${category}</span>
                            </p>
                            <p class="catalogue-list-article text-special">
                                Article:
                                <span class="text">${stock}</span>
                            </p>
                        </div>
                    </div>`
                )
            })
        })

}
getProducts();