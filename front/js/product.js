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

// Fonction pour insérer les informations du produit
const insertProductsDatas = (data) => {
    document.querySelector('#title').innerHTML = `${data.name}`;
    document.querySelector('div.item__img').innerHTML = `<img src="${data.imageUrl}" alt="${data.altTxt}" />`;
    document.querySelector('#price').innerHTML = `${data.price}`;
    document.querySelector('#description').innerHTML = `${data.description}`;
    data.colors.forEach(color => document.querySelector('#colors').appendChild(new Option(`${color}`, `${color}`)));

    document.title = `${data.name}`;
}

// Fonction pour récupérer un produit de l'API selon son id
fetch(`http://localhost:3000/api/products/${getUrlId()}`)
    .then(response => response.json())
    .then((data) => {
        insertProductsDatas(data);
    })
    .catch(error => "L'erreur suivante est survenue : " + error);


// Ajouter le produit et la quantité dans le localStorage
let addToCart = document.getElementById("addToCart");
let input = document.getElementById('quantity');
let localStorageDatas = localStorage.getItem("cart") === null ? [] : [...JSON.parse(localStorage.getItem("cart"))];

const addAndModifyDatasToLocalStorage = (thisArray, object) => {
    thisArray.forEach(element => {
        if (element.id === getUrlId() && element.color === object.color) {
            element.quantity = (parseInt(element.quantity) + parseInt(object.quantity)).toString();
        } else {
            thisArray.push(object);
        }
        localStorage.setItem("cart", JSON.stringify(thisArray));
    })
}

const sendToLocalStorage = (thisArray, object) => {
    if (localStorageDatas.length === 0) {
        thisArray.push(object);
        localStorage.setItem("cart", JSON.stringify(thisArray));
    }
    else {
        addAndModifyDatasToLocalStorage(thisArray, object);
    }
}

// Fonction gérant l'ajout ou la modification des données dans le localStorage
addToCart.addEventListener("click", () => {
    if (input.value === "0" || document.querySelector("#colors") === "") {
        alert("Vous devez choisir une quantité et une couleur pour votre Kanap !")
    } 
    else {
        let newObject = {
            id: getUrlId(),
            quantity: input.value,
            color: document.querySelector("#colors").value
        }

        sendToLocalStorage(localStorageDatas, newObject);

        window.confirm(`L'article a bien été ajouté à votre panier`);
    }
})