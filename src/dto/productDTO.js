export class ProductDTO {
    constructor(title, description, price, stock, imageUrl, category, subCategory){
        this.title = title;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.imageUrl = imageUrl;
        this.category = category;
        this.subCategory = subCategory;
    }
}