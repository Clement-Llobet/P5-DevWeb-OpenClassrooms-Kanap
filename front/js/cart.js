import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import Contact from "./utils/contact.js";

let localStorageDatas = getFromLocalStorage();

// Fonction qui indique 0 par défault pour les sommes du panier
const CheckCountToZero = () => {
    const cart = getFromLocalStorage();
    if (cart.length === 0) {
        document.querySelector("#totalPrice").textContent = "0";
        document.querySelector("#totalQuantity").textContent = "0";
    }
}

// Fonction pour supprimer un article du localStorage
const removeFromLocalStorage = (element) => {
    const cart = getFromLocalStorage();
    let article = element.closest('article.cart__item');
    const index = cart.findIndex(object => object.id === article.dataset.id && object.color === article.dataset.color);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}

// Fonction pour calculer le nombre d'articles et le prix total du panier
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
                document.querySelector("#totalPrice").textContent = basketPricesSum;
                document.querySelector("#totalQuantity").textContent = basketArticlesSum;
            }
        });
    });
}

// Méthode pour supprimer l'article du panier
const deleteArticle = () => {
    document.querySelectorAll("p.deleteItem").forEach((button) => {
        button.addEventListener('click', () => {
            let article = button.closest('article');
            article.remove();
            basketSums();
            removeFromLocalStorage(button);
            CheckCountToZero();
        })
    })
}

// Fonction destinée à récupérer le bon index d'un produit
const addToLocalStorage = (element) => {
    const cart = getFromLocalStorage();
    let article = element.closest('article.cart__item');
    const index = cart.findIndex(object => object.id === article.dataset.id && object.color === article.dataset.color);
    cart[index].quantity = element.value;
    localStorage.setItem('cart', JSON.stringify(cart));
    return index
}

// Fonction pour modifier la quantité du panier
const modifyBasketQuantity = (localStorageDatas) => {
    document.querySelectorAll("input.itemQuantity").forEach((element) => {
        element.addEventListener('change', () => {
            const index = addToLocalStorage(element);
            localStorageDatas[index].quantity = element.value;
            basketSums();
            CheckCountToZero();
        })
    })
}

// Insère les informations dans le DOM
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


// Formulaire
let customerContact = new Contact();

// Fonctions vérifiant les informations entrées dans les input
const checkAndAddCustomerSurname = () => {
    document.getElementById("firstName").addEventListener("change", (event) => {
        let elementToModify = event.target.nextElementSibling;
        customerContact.checkFirstname(event.target.value);
        customerContact.firstName ? elementToModify.textContent = "" : elementToModify.textContent = "Votre prénom doit être composé de lettres et avoir plus de 2 caractères. Veuillez réessayer.";
    })
}

const checkAndAddCustomerName = () => {
    document.getElementById("lastName").addEventListener("change", (event) => {
        let elementToModify = event.target.nextElementSibling;
        customerContact.checkLastname(event.target.value);
        customerContact.lastName ? elementToModify.textContent = "" : elementToModify.textContent = "Votre nom doit être composé de lettres et avoir plus de 2 caractères. Veuillez réessayer.";
    })
}
    
const checkAndAddCustomerAddress = () => {
    document.getElementById("address").addEventListener("change", (event) => {
        let elementToModify = event.target.nextElementSibling;
        customerContact.checkAddress(event.target.value);
        customerContact.address ? elementToModify.textContent = "" : elementToModify.textContent = "Votre adresse n'est pas correcte. Veuillez entrer une adresse valide";
    })
}
    
const checkAndAddCustomerCity = () => {
    document.getElementById("city").addEventListener("change", (event) => {
        let elementToModify = event.target.nextElementSibling;
        customerContact.checkCity(event.target.value);
        customerContact.city ? elementToModify.textContent = "" : elementToModify.textContent = "Le nom de votre ville doit être composée de lettres et avoir plus de 2 caractères. Veuillez réessayer";
    })
}
    
const checkAndAddCustomerEmail = () => {
    document.getElementById("email").addEventListener("change", (event) => {
        let elementToModify = event.target.nextElementSibling;
        customerContact.checkEmail(event.target.value);
        customerContact.email ? elementToModify.textContent = "" : elementToModify.textContent = "Votre email n'est pas correct. Veuillez entrer un email valide";    
    });
}


// Fonction déclenchant l'envoi de la commande

const postCommand = () => {

    const cart = getFromLocalStorage();
    let cartIds = cart.map((object) => {
        return object.id
    })

    fetch("https://p5-llobet-clement-oc.herokuapp.com/api/products/order", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            contact: customerContact,
            products: cartIds
        })
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
    })
    .then((value) => location.href = `./confirmation.html?id=${value.orderId}`)
}

const sendUserCommand = () => {
    try {
        postCommand();
    }
    catch (error) {
        throw (`An unexpected error occured: ${error}`);
    }
}

const isCustomerContactCorrect = () => {
    let response = true;
    for (let property in customerContact) {
        if (customerContact[property] === undefined) {
            response = false;
        }
    }
    response ? sendUserCommand() : alert("Attention : vous devez valider chaque champ.");
}

const checkFormInfos = () => {
    checkAndAddCustomerSurname();
    checkAndAddCustomerName();
    checkAndAddCustomerAddress();
    checkAndAddCustomerCity();
    checkAndAddCustomerEmail();

    document.getElementById('order').addEventListener("click", (event) => {
        event.preventDefault();
        isCustomerContactCorrect();
    })
}

// Insertion des éléments dans la page
const init = () => {
    fetch("https://p5-llobet-clement-oc.herokuapp.com/api/products")
    .then(response => response.json())
    .then((data) => {
        retrieveAndFormatProducts(data);
        displayInfos();
        modifyBasketQuantity(localStorageDatas);
        deleteArticle();
        basketSums();
        CheckCountToZero();
        checkFormInfos();
    })
    .catch(error => "L'erreur suivante est survenue : " + error)
}

window.onload = init;
