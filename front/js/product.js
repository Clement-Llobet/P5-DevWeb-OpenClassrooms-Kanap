class Product {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}

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
            
            productColors = data[i].colors;
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
console.log(array);
console.log(parsedArray);

addToCart.addEventListener("click", () => {

    // Ajouter une fonction qui vérifie si le client a bien sélectionné une couleur et si la quantité est > 0
    
    if (localStorage.getItem("cart") === null) {
        let newObject = new Product(thisID, input.value, productSelectOptions.options[productSelectOptions.selectedIndex].value);
        parsedArray.push(newObject);
        localStorage.setItem("cart", JSON.stringify(parsedArray));
    }
    else {
        let index = parsedArray.findIndex((object) => object.id === thisID);
        console.log(index);

        if (index === -1) {
            let newObject = new Product(thisID, input.value, productSelectOptions.options[productSelectOptions.selectedIndex].value);
            parsedArray.push(newObject);
            console.log(parsedArray);

            localStorage.setItem("cart", JSON.stringify(parsedArray));
        }
        else if (parsedArray[index].id === thisID && parsedArray[index].color === productSelectOptions.options[productSelectOptions.selectedIndex].value) {
            parsedArray[index].quantity = (parseInt(parsedArray[index].quantity) + parseInt(input.value)).toString();
            localStorage.setItem("cart", JSON.stringify(parsedArray));
        }
        else {
            let newObject = new Product(thisID, input.value, productSelectOptions.options[productSelectOptions.selectedIndex].value);
            parsedArray.push(newObject);
            console.log(parsedArray);

            localStorage.setItem("cart", JSON.stringify(parsedArray));
        }
    }
})