import utils from "../utils.js";

export class ItemDTO{
    constructor(id, title,  description, category, price, quantity){
        this.id= id;
        this.title= title;
        this.currency_id= 'ARS';
        
        this.description= description;
        this.category_id= category;
        this.quantity= quantity;
        this.unit_price= utils.formatUnitPrice(price);
    }
}