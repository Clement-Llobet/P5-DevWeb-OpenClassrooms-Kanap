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
console.log(array);

localStorage.getItem("cart") === null ? [] : array.push(JSON.parse(localStorage.getItem("cart")))

console.log(array);


addToCart.addEventListener("click", () => {
    console.log(array);
    if (localStorage.getItem("cart") === null) {
        let newObject = new Product(thisID, input.value, productSelectOptions.options[productSelectOptions.selectedIndex].value);
        array.push(newObject);
        localStorage.setItem("cart", JSON.stringify(array));
    }
    else {
        console.log(array);
        // array.forEach(() => {
        for (object in array) {
            
            console.log(object);
            // if (object.id === thisID && object.color === productSelectOptions.options[productSelectOptions.selectedIndex].value) {
            //     console.log("On change seulement la valeur de la quantité de l'objet");
            //     // object.quantity = ParseInt(object.quantity) + ParseInt(input.value);
            //     // console.log(object.quantity);
            // }
            // else {
            //     console.log("On créé un nouvel objet qu'on ajoute au tableau");
            // }
        }
        // )
    }

    

    // let newObject = new Product(thisID, input.value, productSelectOptions.options[productSelectOptions.selectedIndex].value);
    // array.push(newObject);
    // console.log(array);

    // localStorage.setItem("cart", JSON.stringify(array));
})