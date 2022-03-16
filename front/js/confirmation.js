import { getUrlParameter } from "./utils/getUrlParameters.js"

// Fonction pour récupérer l'id du produit dans l'URL de la page

document.querySelector("#orderId").innerHTML = `${getUrlParameter("id")}`;
localStorage.clear();