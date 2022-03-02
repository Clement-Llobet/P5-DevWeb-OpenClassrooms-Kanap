let localStorageDatas = localStorage.getItem("cart") === null ? [] : [...JSON.parse(localStorage.getItem("cart"))];

// Fonction pour calculer le nombre d'articles et le prix total du panier
const basketSums = () => {
    let basketArticlesSum = 0;
    let basketPricesSum = 0;
    let itemQuantity = document.querySelectorAll('input.itemQuantity');

    console.log(localStorageDatas);

    itemQuantity.forEach((item) => {
        basketArticlesSum += parseInt(item.value);
        let article = item.closest('article.cart__item');

        localStorageDatas.forEach((object) => {
            if (object.id === article.dataset.id) {
                console.log(object.price);
                console.log(item.value);
                basketPricesSum += (object.price * parseInt(item.value));
                document.querySelector("#totalPrice").innerHTML = basketPricesSum;
                document.querySelector("#totalQuantity").innerHTML = basketArticlesSum;
            }
        });
    });
}


// Fonction pour supprimer les propriétés de l'objet qui ne doivent pas être envoyées dans le localStorage
const deleteUselessObjectProperties = (objectToModify) => {
    Object.keys(objectToModify)
    .filter((key)=> {
        if (key !== "id" && key !== "quantity" && key !== "color") {
            return key
        }
    })
    .forEach(property => Reflect.deleteProperty(objectToModify, property));
}

// Méthode pour modifier la quantité du panier
const modifyBasketQuantity = (localStorageDatas) => {
    document.querySelectorAll("input.itemQuantity").forEach((element) => {
        element.addEventListener('change', () => {

            let article = element.closest('article.cart__item');
            localStorageDatas.forEach((object) => {
                if (object.id === article.dataset.id && object.color === article.dataset.color) {
                    object.quantity = element.value;
                }
                deleteUselessObjectProperties(object);
                localStorage.setItem("cart", JSON.stringify(localStorageDatas));
                // Refaire appel localStorage avant setItem, placer dans autre var
            })
            basketSums();

        })
    })
}

// Méthode pour supprimer l'article du panier
// document.querySelectorAll("p.deleteItem").forEach((button) => {
//     let article = button.closest('article.cart__item');

//     button.addEventListener('click', () => {
//         let index = basketArray.findIndex((object) => object.id === article.dataset.id);
//         basketArray.splice(index, 1);
//         article.remove() // remove Node ?
//         localStorage.setItem("cart", JSON.stringify(basketArray));
//     })
// })


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


fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        retrieveAndFormatProducts(data);
        displayInfos();
        modifyBasketQuantity(localStorageDatas);
    })
    .catch(error => "L'erreur suivante est survenue : " + error)