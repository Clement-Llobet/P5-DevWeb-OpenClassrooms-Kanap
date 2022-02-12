let array = new Array;
let parsedArray = new Array;

localStorage.getItem("cart") === null ? array : array.push(localStorage.getItem("cart"));
array.length === 0 ? array : parsedArray = JSON.parse(array);

let dataProduct = new BasketProduct();

const insertProducts = (data) => {
    let cartItems = document.getElementById("cart__items");

    cartItems.innerHTML = data.map(product => `
            <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                    <img src="../images/product01.jpg" alt="Photographie d'un canapé">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                        <h2>Nom du produit</h2>
                            <p>Vert</p>
                            <p>42,00 €</p>
                    </div>
                    <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                    </div>
                </div>
            </article>`
        ).join("");    
}

fetch("http://localhost:3000/api/products")
    .then(response => response.json())
    .then((data) => {
        insertProducts(data);
    })
    .catch(error => "L'erreur suivante est survenue : " + error)