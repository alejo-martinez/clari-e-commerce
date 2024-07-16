import { productModel } from "../models/product.model.js";

export class ProductManager {

    static async getAll() {
        try {
            return await productModel.find().lean();
        } catch (error) {
            return error;
        }
    }

    static async getAllLimit(page) {
        try {
            const limit = 16; // Number of products per page
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = await productModel.paginate({}, { limit: limit, page, lean: true })

            const response = { docs: docs, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevPage: prevPage, nextPage: nextPage, totalPages: totalPages, page: page };
            return response;
        } catch (error) {
            return error;
        }
    }

    static async getByCategory(category) {
        try {
            return await productModel.find({ category: category }).lean();
        } catch (error) {
            return error;
        }
    }

    static async getBySubCategory(subCategory) {
        try {
            return await productModel.find({ subCategory: subCategory }).lean();
        } catch (error) {
            return error;
        }
    }

    static async getById(id) {
        try {
            return await productModel.findOne({ _id: id }).lean();
        } catch (error) {
            return error;
        }
    }

    static async create(item) {
        try {
            await productModel.create(item);
        } catch (error) {
            return error;
        }
    }

    static async update(field, value, id, subId, sizeId) {
        try {
            if (subId) {
                const producto = await productModel.findOne({ _id: id });
                if (!sizeId) {
                    const variant = producto.variants.id(subId)
                    variant.color = value;
                }
                if (sizeId) {
                    const variant = producto.variants.id(subId)
                    const size = variant.sizes.id(sizeId);
                    size[field] = value;
                }
                await producto.save();
                return producto;
            }
            else await productModel.updateOne({ _id: id }, { $set: { [field]: value } });
        } catch (error) {
            return error;
        }
    }

    static async delete(id) {
        try {
            await productModel.deleteOne({ _id: id });
        } catch (error) {
            return error;
        }
    }
}

