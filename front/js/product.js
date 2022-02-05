const getUrlId = () => {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    
    if (searchParams.has("id")) {
        let id = searchParams.get("id");
        return id
    } else {
        alert(`Erreur 404 : cette page n'existe pas.`);
        window;location.href = "../index.html"
    }
}

let thisID = getUrlId();

let productImage = document.querySelector("div.item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productSelectOptions = document.getElementById("colors");

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        
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
        
    })
    .catch(error => "L'erreur suivante est survenue : " + error)