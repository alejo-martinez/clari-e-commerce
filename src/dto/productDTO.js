import utils from "../utils.js";

export class ProductDTO {
    constructor(title, description, variants, imagesUrl, category){
        this.title = title;
        this.description = description;
        this.imagesUrl = imagesUrl;
        this.category = category;
        this.variants = variants;
        this.totalStock = utils.calculateTotalStock(variants);
        // this.key = key;
    }
}