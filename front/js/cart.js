import { BasketProduct } from "./models/basketProductClass.js";


let array = new Array;
let basketArray;

localStorage.getItem("cart") === null ? array : array.push(localStorage.getItem("cart"));
array.length === 0 ? array : basketArray = JSON.parse(array);

console.log(basketArray);

// Fonction pour insérer les élément du panier dans la page en fonction du localStorage
const insertProducts = (data) => {
    let cartItems = document.getElementById("cart__items");
    let basketProductArray = new Array;

    for (let i in basketArray) {
        let index = data.findIndex((object) => object._id === basketArray[i].id);
        let newBasketProduct = new BasketProduct();

        if (data[index]._id === basketArray[i].id) {
            newBasketProduct.id = data[index]._id;
            newBasketProduct.name = data[index].name;
            newBasketProduct.price = data[index].price;
            newBasketProduct.imageUrl = data[index].imageUrl;
            newBasketProduct.description = data[index].description;
            newBasketProduct.altTxt = data[index].altTxt;
            newBasketProduct.quantity = basketArray[i].quantity;
            newBasketProduct.color = basketArray[i].color;

            basketProductArray.push(newBasketProduct)
        }
    }

    cartItems.innerHTML = basketProductArray.map(product => `
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
            </article>`
        ).join("");

    // Méthode pour modifier la quantité du panier
    const input = document.querySelectorAll("input.itemQuantity")

    input.forEach((element) => {
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

    // Méthode pour supprimer l'article du panier
    const deleteButton = document.querySelectorAll("p.deleteItem");

    deleteButton.forEach((button) => {
        let article = button.closest('article.cart__item');

        button.addEventListener('click', () => {
            let index = basketArray.findIndex((object) => object.id === article.dataset.id);
            basketArray.splice(index, 1);
            article.style.display = "none";
            localStorage.setItem("cart", JSON.stringify(basketArray));
        })
    })
    
    
}

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        insertProducts(data);
    })
    .catch(error => "L'erreur suivante est survenue : " + error)