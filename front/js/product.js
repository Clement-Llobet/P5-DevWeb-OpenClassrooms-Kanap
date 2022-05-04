import { getFromLocalStorage } from "./utils/getFromLocalStorage.js";
import { getUrlParameter } from "./utils/getUrlParameters.js"
let localStorageDatas = getFromLocalStorage();

// Ajouter le produit et modifier quantité dans le localStorage
const addAndModifyDatasToLocalStorage = (thisArray, object) => {
    let existingProductIndex = thisArray.findIndex((element) => element.id === object.id && element.color === object.color);

    if (existingProductIndex > -1) {
        thisArray[existingProductIndex].quantity = (parseInt(thisArray[existingProductIndex].quantity) + parseInt(object.quantity)).toString();
    } else {
        thisArray.push(object);
    }
}

// Vérifie la taille des données du local Storage
const prepareToLocalStorage = (thisArray, object) => {
    localStorageDatas.length === 0 ? thisArray.push(object) : addAndModifyDatasToLocalStorage(thisArray, object);
}

const addListeners = () => {
    let addToCart = document.getElementById("addToCart");

    // Fonction gérant l'ajout ou la modification des données dans le localStorage
    addToCart.addEventListener("click", () => {
        let input = document.getElementById('quantity');

        if (input.value === "0" || document.querySelector("#colors").value === "") {
            alert("Vous devez choisir une quantité et une couleur pour votre Kanap !")
        } 
        else {
            let newObject = {
                id: getUrlParameter("id"),
                quantity: input.value,
                color: document.querySelector("#colors").value
            }

            prepareToLocalStorage(localStorageDatas, newObject);
            localStorage.setItem("cart", JSON.stringify(localStorageDatas));
            window.confirm(`L'article a bien été ajouté à votre panier`);
        }
    })
}

// Fonction pour insérer les informations du produit
const insertProductsDatas = (data) => {
    document.title = `${data.name}`;
    document.querySelector('#title').innerHTML = `${data.name}`;
    document.querySelector('div.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;
    document.querySelector('#price').innerHTML = `${data.price}`;
    document.querySelector('#description').innerHTML = `${data.description}`;
    data.colors.forEach(color => document.querySelector('#colors').appendChild(new Option(`${color}`, `${color}`)));
}

// Fonction pour récupérer un produit de l'API selon son id
const init = () => {
    fetch(`https://p5-llobet-clement-oc.herokuapp.com/api/products/${getUrlParameter("id")}`)
        .then(response => response.json())
        .then((data) => {
            insertProductsDatas(data);
        })
        .catch(error => "L'erreur suivante est survenue : " + error)

        addListeners();
}

window.onload = init;
