import { Product } from "./models/productClass.js";

// Fonction pour récupérer l'id du produit dans l'URL de la page
const getUrlId = () => {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    
    if (searchParams.has("id")) {
        let id = searchParams.get("id");
        return id
    } else {
        alert(`Erreur 404 : cette page n'existe pas.`);
        window.location.href = "../index.html"
    }
}

let thisID = getUrlId();


let productImage = document.querySelector("div.item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productSelectOptions = document.getElementById("colors");

// Fonction pour insérer les informations du produit
const insertProductsDatas = (data) => {
    for (let i = 0; i < data.length; i++) {
        if (data[i]._id === thisID) {
            productImage.innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}">`;
            productTitle.innerHTML = `${data[i].name}`;
            productPrice.innerHTML = `${data[i].price}`;
            productDescription.innerHTML = `${data[i].description}`;
            
            let productColors = data[i].colors;
            productColors.forEach(color => {
                let newOption = new Option(`${color}`, `${color}`);
                productSelectOptions.appendChild(newOption);
            });

            
            document.title = `${data[i].name}`;
            break;
        }
    }
}

// Fonction pour récupérer un produit de l'API selon son id
fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        insertProductsDatas(data);
    })
    .catch(error => "L'erreur suivante est survenue : " + error);


// Ajouter le produit et la quantité dans le localStorage
let addToCart = document.getElementById("addToCart");
let input = document.getElementById('quantity');

let array = new Array;
let parsedArray = new Array;

localStorage.getItem("cart") === null ? array : array.push(localStorage.getItem("cart"));
array.length === 0 ? array : parsedArray = JSON.parse(array);

// Fonction gérant l'ajout ou la modification des données dans le localStorage
addToCart.addEventListener("click", () => {
    if (input.value === "0" || productSelectOptions.options[productSelectOptions.selectedIndex].value === "") {
        alert("Vous devez choisir une quantité et une couleur pour votre Kanap !")
    } 
    else {
        let newObject = new Product(thisID, input.value, productSelectOptions.options[productSelectOptions.selectedIndex].value);
        let index = parsedArray.findIndex((object) => object.id === thisID);
    
        // Fonction pour ajouter ou modifier un produit dans le LocalStorage
        const addAndModifyDatasToLocalStorage = (thisArray) => {
            if (index === -1) {
                thisArray.push(newObject);
                localStorage.setItem("cart", JSON.stringify(thisArray));
            }
            else if (thisArray[index].id === thisID && thisArray[index].color === productSelectOptions.options[productSelectOptions.selectedIndex].value) {
                thisArray[index].quantity = (parseInt(thisArray[index].quantity) + parseInt(input.value)).toString();
                localStorage.setItem("cart", JSON.stringify(thisArray));
            }
            else {
                thisArray.push(newObject);
                localStorage.setItem("cart", JSON.stringify(thisArray));
            }
        }
    
        const sendToLocalStorage = (thisArray) => {
            if (localStorage.getItem("cart") === null) {
                thisArray.push(newObject);
                localStorage.setItem("cart", JSON.stringify(thisArray));
            }
            else {
                addAndModifyDatasToLocalStorage(thisArray);
            }
        }
    
        sendToLocalStorage(parsedArray);

        window.confirm(`L'article ${productTitle.textContent} a bien été ajouté à votre panier`)
    }
})