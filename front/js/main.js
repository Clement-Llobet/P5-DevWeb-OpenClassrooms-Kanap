// Fonction pour insérer les données des produits dans la page
const insertInfos = (data) => {
    let items = document.getElementById("items");

        items.innerHTML = data.map(product => `
            <a href="./product.html?id=${product._id}">
                <article>
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                    <h3 class="productName">${product.name}</h3>
                    <p class="productDescription">${product.description}</p>
                </article>
            </a>`
        ).join("");
}

// Fonction de requête à l'API pour récupérer l'ensemble des produits et insérer chaque élément dans la page d'accueil
const init = () => {
    fetch("https://p5-llobet-clement-oc.herokuapp.com/api/products")
    .then(response => response.json())
    .then((data) => {
        insertInfos(data);
    })
    .catch(error => "L'erreur suivante est survenue : " + error)
}    

window.onload = init;
