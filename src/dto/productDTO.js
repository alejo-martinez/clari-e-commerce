export class ProductDTO {
    constructor(title, description, price, stock, imageUrl, category, subCategory, key){
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.category = category;
        this.subCategory = subCategory;
        this.key = key;
    }
}