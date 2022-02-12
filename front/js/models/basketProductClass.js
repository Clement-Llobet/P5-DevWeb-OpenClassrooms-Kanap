import { Product } from "./productClass.js";

class BasketProduct extends Product {
    constructor(id, name, price, imageUrl, description, altTxt, quantity, color) {
        super(id, quantity, color);
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.altTxt = altTxt;
    }
}

export { BasketProduct }