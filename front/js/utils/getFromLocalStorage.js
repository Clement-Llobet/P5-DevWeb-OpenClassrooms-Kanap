export const getFromLocalStorage = () => {
    return localStorage.getItem("cart") ? [...JSON.parse(localStorage.getItem("cart"))] : [];
}