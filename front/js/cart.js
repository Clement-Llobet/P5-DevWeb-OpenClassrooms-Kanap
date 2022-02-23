let localStorageDatas = localStorage.getItem("cart", ) === null ? [] : [...JSON.parse(localStorage.getItem("cart"))];


// Méthode pour modifier la quantité du panier
const modifyBasketQuantity = () => {
    document.querySelectorAll("input.itemQuantity").forEach((element) => {
        element.addEventListener('change', () => {
            let article = element.closest('article.cart__item');
            
            basketArray.forEach((object) => {
                if (object.id === article.dataset.id) {
                    object.quantity = element.value;
                    localStorage.setItem("cart", JSON.stringify(basketArray));
                }
            })
        })
    })
}

// Méthode pour supprimer l'article du panier
const deleteArticle = () => {
    document.querySelectorAll("p.deleteItem").forEach((button) => {
        let article = button.closest('article.cart__item');

        button.addEventListener('click', () => {
            let index = basketArray.findIndex((object) => object.id === article.dataset.id);
            basketArray.splice(index, 1);
            article.remove() // remove Node ?
            localStorage.setItem("cart", JSON.stringify(basketArray));
        })
    }) 
}


// Fonction pour insérer les élément du panier dans la page en fonction du localStorage
const insertProducts = (data) => {
    localStorageDatas.forEach((object) => {
        let info = data.find((element) => element._id === object.id);
        object.name = info.name;
        object.imageUrl = info.imageUrl;
        object.altTxt = info.altTxt;
        object.price = info.price;
    })

    document.getElementById("cart__items").innerHTML = localStorageDatas.map(product => `
        <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${product.name}</h2>
                        <p>${product.color}</p>
                        <p>${product.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                </div>
            </div>
        </article>
    `).join("");
}

// Fonction pour calculer le nombre d'articles dans le panier
const basketArticlesSum = () => {
    let basketArticlesSum = 0;
    let itemQuantity = document.querySelectorAll('input.itemQuantity');
    itemQuantity.forEach((item) => {
        basketArticlesSum += parseInt(item.value);
    })
    document.querySelector("#totalQuantity").innerHTML = (basketArticlesSum).toString();
}

// Fonction pour calculer le prix total du panier
const basketPriceSum = () => {
    let basketPriceSum = 0;
    let itemPrice = document.querySelectorAll('div.cart__item__content__description');
    itemPrice.forEach((item) => {
        basketPriceSum += parseInt(item.lastElementChild.innerText);
        console.log(basketPriceSum);
    })
    document.querySelector("#totalPrice").innerHTML = (basketPriceSum).toString();
}

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        insertProducts(data);
        basketArticlesSum();
        basketPriceSum();
    })
    .catch(error => "L'erreur suivante est survenue : " + error)