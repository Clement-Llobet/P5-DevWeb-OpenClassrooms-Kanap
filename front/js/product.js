const getUrlId = () => {
    let url = new URL(window.location.href);
    let searchParams = new URLSearchParams(url.search);
    
    if(searchParams.has("id")) {
        let id = searchParams.get("id");
    } else {
        console.log(`Erreur 404 : cette page n'existe pas.`);
    }
}

let productImage = document.querySelector("div.item__img");
let productTitle = document.getElementById("title");
let productPrice = document.getElementById("price");
let productDescription = document.getElementById("description");
let productSelectOptions = document.getElementById("colors");

let thisId = getUrlId();

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].id === thisId) {
                productImage.innerHTML = `<img src="${data[i].imageUrl}" alt="${data[i].altTxt}">`;
                productTitle.innerHTML = `${data[i].name}`;
                productPrice.innerHTML = `${data[i].price}`;
                productDescription.innerHTML = `${data[i].description}`;
                
                productColors = data[i].colors;
                productSelectOptions.innerHTML = productColors.map(color =>
                    `<option value="${color}">${color}</option>`
                    )
                
                    document.title = `${data[i].name}`;
                
                break;
            }
        }
        
    })
    .catch(error => "L'erreur suivante est survenue : " + error)