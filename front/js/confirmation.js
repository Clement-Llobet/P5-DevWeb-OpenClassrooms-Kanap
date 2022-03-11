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

document.querySelector("#orderId").innerHTML = `${getUrlId()}`;
localStorage.clear();