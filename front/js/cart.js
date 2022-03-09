import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import Contact from "./utils/contact.js";


let localStorageDatas = getFromLocalStorage();


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
                document.querySelector("#totalPrice").innerHTML = basketPricesSum;
                document.querySelector("#totalQuantity").innerHTML = basketArticlesSum;
            }
        });
    });
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

// Fonction qui indique 0 par défault pour les sommes du panier
const CountToZero = () => {
    const cart = getFromLocalStorage();
    if (cart.length === 0) {
        document.querySelector("#totalPrice").innerHTML = "0";
        document.querySelector("#totalQuantity").innerHTML = "0";
    }
}

// Fonction pour modifier la quantité du panier
const modifyBasketQuantity = (localStorageDatas) => {
    document.querySelectorAll("input.itemQuantity").forEach((element) => {
        element.addEventListener('change', () => {
            const index = addToLocalStorage(element);
            localStorageDatas[index].quantity = element.value;
            basketSums();
            CountToZero();
        })
    })
}

// Fonction pour supprimer un article du localStorage
const removeFromLocalStorage = (element) => {
    const cart = getFromLocalStorage();
    let article = element.closest('article.cart__item');
    const index = cart.findIndex(object => object.id === article.dataset.id && object.color === article.dataset.color);
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
}


// Méthode pour supprimer l'article du panier
const deleteArticle = () => {
    document.querySelectorAll("p.deleteItem").forEach((button) => {
        button.addEventListener('click', () => {
            let article = button.closest('article');
            article.remove();
            basketSums();
            removeFromLocalStorage(button);
            CountToZero();
        })
    })
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


// Insertion des éléments dans la page
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        retrieveAndFormatProducts(data);
        displayInfos();
        modifyBasketQuantity(localStorageDatas);
        deleteArticle();
        basketSums();
        CountToZero();
    })
    .catch(error => "L'erreur suivante est survenue : " + error)



// Formulaire
let customerContact = new Contact();

// Fonctions vérifiant les informations entrées dans les input
const checkAndAddCustomerSurname = () => {
    document.getElementById("firstName").addEventListener("change", (input) => {

        // console.log(customerContact);
        // let elementToModify = input.target.nextElementSibling;
        // customerContact.surname ? elementToModify.innerHTML = "" : elementToModify.innerText = "Votre prénom doit avoir plus de 2 caractères. Veuillez réessayer.";
    })
}

const checkAndAddCustomerName = () => {
    document.getElementById("lastName").addEventListener("change", (input) => {
        customerContact.name = customerContact.checkName(input.explicitOriginalTarget.value);
        console.log(customerContact);
        let elementToModify = input.target.nextElementSibling;
        customerContact.name ? elementToModify.innerText = "" : elementToModify.innerText = "Votre nom doit avoir plus de 2 caractères. Veuillez réessayer.";
    })
}
    
const checkAndAddCustomerAddress = () => {
    document.getElementById("address").addEventListener("change", (input) => {
        customerContact.address = customerContact.checkAddress(input.explicitOriginalTarget.value);
        let elementToModify = input.target.nextElementSibling;
        customerContact.address ? elementToModify.innerText = "" : elementToModify.innerText = "L'adresse renseignée n'est pas correcte. Veuillez réessayer.";

    })
}
    
const checkAndAddCustomerCity = () => {
    document.getElementById("city").addEventListener("change", (input) => {
        customerContact.city = customerContact.checkCity(input.explicitOriginalTarget.value);
        let elementToModify = input.target.nextElementSibling;
        customerContact.city ? elementToModify.innerText = "" : elementToModify.innerText = "La ville renseignée n'est pas correcte. Veuillez réessayer";
    })
}
    
const checkAndAddCustomerEmail = () => {
    document.getElementById("email").addEventListener("change", (input) => {
        customerContact.email = customerContact.checkEmail(input.explicitOriginalTarget.value);
        let elementToModify = input.target.nextElementSibling;
        customerContact.email ? elementToModify.innerText = "" : elementToModify.innerText = "Votre email n'est pas correct. Veuillez entrer un email valide";
    })
}


// // Fonction déclenchant l'envoi de la commande
// const sendUserCommand = () => {
//     fetch("http://localhost:3000/api/", {
//         method: "POST",
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type' : 'application/json'
//         },
//         body: JSON.stringify({
//             value: mettreIciLaValeur
//         })
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//         })
//         .then((value) => {
//             console.log(value);
//             // On récupère le numéro de commande
//             // On va sur la page confirmation.html
//             // On va chercher l'id #orderId
//             // On insère le numéro de commande
//         })
//     });
// }

// document.getElementById('order').addEventListener("click", () => {
//     sendUserCommand()
    
    

//     console.log("Hello");
// })

checkAndAddCustomerSurname();
checkAndAddCustomerName();
checkAndAddCustomerAddress();
checkAndAddCustomerCity();
checkAndAddCustomerEmail();

