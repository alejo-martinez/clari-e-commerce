export class ProductManager {
    constructor(model, api) {
        this.model = model;
        this.api = api;
    }

    async getAll(req) {
        try {
            const { limit = 10 } = req.query
            const { page = 1 } = req.query
            const sort = req.query.sort
            const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } = await this.model.paginate({}, { limit: limit, page, lean: true })
            const productos = docs
            let prevLink;
            let nextLink;
            if (limit !== 10) {
                if (hasNextPage === false) nextLink = null
                else nextLink = `/api/${this.api}?limit=${limit}&page=${nextPage}`
                if (hasPrevPage === false) prevLink = null
                else prevLink = `/api/${this.api}?limit=${limit}&page=${prevPage}`
                let productosLimitados = productos.slice(0, limit)
                const payload = {status:'succes', payload: productosLimitados, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink}
                return payload;
            } else if (sort) {
                if (hasNextPage === false) nextLink = null;
                else nextLink = `/api/${this.api}?sort=${sort}&page=${nextPage}`;
                if (hasPrevPage === false) prevLink = null;
                else prevLink = `/api/${this.api}?sort=${sort}&page=${prevPage}`;
                let ordenados = await this.model.find({}).sort({ price: sort == 1? 'desc':'asc' }).exec()
                const payload = {status:'succes', payload: ordenados, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page,  hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink }
                return payload;
            } else {
                if (hasNextPage === false) nextLink = null
                else nextLink = `/api/${this.api}?page=${nextPage}`
                if (hasPrevPage === false) prevLink = null
                else prevLink = `/api/${this.api}?page=${prevPage}`
                const payload = {status:'succes', payload: productos, totalPages: totalPages, prevPage: prevPage, nextPage: nextPage, page: page, hasPrevPage: hasPrevPage, hasNextPage: hasNextPage, prevLink: prevLink, nextLink: nextLink }
                return payload;
            }        
        } catch (error) {
            return error;
        }
    }

    async getByCategory(category) {
        try {
            return await this.model.find({ category: category }).lean();
        } catch (error) {
            return error;
        }
    }

    async getById(id) {
        try {
            return await this.model.findOne({ _id: id }).lean();
        } catch (error) {
            return error;
        }
    }

    async create(item) {
        try {
            await this.model.create(item);
        } catch (error) {
            return error;
        }
    }

    async update(field, value, id) {
        try {
            await this.model.updateOne({ _id: id }, { $set: { [field]: value } });
        } catch (error) {
            return error;
        }
    }

    async delete(id) {
        try {
            await this.model.deleteOne({ _id: id });
        } catch (error) {
            return error;
        }
    }
}