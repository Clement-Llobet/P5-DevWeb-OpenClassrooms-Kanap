import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";

let localStorageDatas = getFromLocalStorage();

// Fonction pour calculer le nombre d'articles et le prix total du panier

const addToLocalStorage = (element) => {
    const cart = getFromLocalStorage();
    let article = element.closest('article.cart__item');
    const index = cart.findIndex(object => object.id === article.dataset.id && object.color === article.dataset.color);
    cart[index].quantity = element.value;
    localStorage.setItem('cart', JSON.stringify(cart));
    return index
}

const basketSums = () => {
    let basketArticlesSum = 0;
    let basketPricesSum = 0;
    let itemQuantity = document.querySelectorAll('input.itemQuantity');

    itemQuantity.forEach((item) => {
        basketArticlesSum += parseInt(item.value);
        let article = item.closest('article.cart__item');

        localStorageDatas.forEach((object) => {
            if (object.id === article.dataset.id) {
                basketPricesSum += (object.price * parseInt(item.value));
                document.querySelector("#totalPrice").innerHTML = basketPricesSum;
                document.querySelector("#totalQuantity").innerHTML = basketArticlesSum;
            }
        });
    });
}


// Méthode pour modifier la quantité du panier
const modifyBasketQuantity = (localStorageDatas) => {
    document.querySelectorAll("input.itemQuantity").forEach((element) => {
        element.addEventListener('change', () => {
            const index = addToLocalStorage(element);
            localStorageDatas[index].quantity = element.value;
            basketSums();
        })
    })
}

// Méthode pour supprimer l'article du panier
// document.querySelectorAll("p.deleteItem").forEach((button) => {
//     let article = button.closest('article.cart__item');

//     button.addEventListener('click', () => {
//         let index = basketArray.findIndex((object) => object.id === article.dataset.id);
//         basketArray.splice(index, 1);
//         article.remove() // remove Node ?
//         localStorage.setItem("cart", JSON.stringify(basketArray));
//     })
// })


// Fonction pour insérer les élément du panier dans la page en fonction du localStorage
const retrieveAndFormatProducts = (data) => {
    localStorageDatas.forEach((object) => {
        let info = data.find((element) => element._id === object.id);
        object.name = info.name;
        object.imageUrl = info.imageUrl;
        object.altTxt = info.altTxt;
        object.price = info.price;
    })
}

const displayInfos = () => {
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


fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        retrieveAndFormatProducts(data);
        displayInfos();
        basketSums();
        modifyBasketQuantity(localStorageDatas);
    })
    .catch(error => "L'erreur suivante est survenue : " + error)