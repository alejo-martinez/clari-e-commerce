import { ProductManager } from "../dao/service/product.service.js";
import { ProductDTO } from "../dto/productDTO.js";
import CustomError from "../errors/custom.error.js";
import { missingFields } from "../errors/info.error.js";
import config from "../config/config.js";
import utils from "../utils.js";
import { productModel } from "../dao/models/product.model.js";

const getAll = async (req, res, next) => {
    try {
        const productos = await ProductManager.getAll()
        
        return res.status(200).send({ status: 'succes', payload: productos });
    } catch (error) {
        next(error);
    }
}

const getAllLimit = async (req, res, next) => {
    try {
        const { page = 1 } = req.query
        const response = await ProductManager.getAllLimit(page);
        // console.log(response)
        return res.status(200).send({ status: 'succes', payload: response });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const { pid } = req.params;
        const producto = await ProductManager.getById(pid);
        return res.status(200).send({ status: 'succes', payload: producto });
    } catch (error) {
        next(error);
    }
}

const getByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        const productos = await ProductManager.getByCategory(category);
        return res.status(200).send({ status: 'succes', payload: productos });
    } catch (error) {
        next(error);
    }
}

const getBySubCategory = async (req, res, next) => {
    try {
        const { subcategory } = req.params;
        const productos = await ProductManager.getBySubCategory(subcategory);
        return res.status(200).send({ status: 'succes', payload: productos });
    } catch (error) {
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        let imageUrl;
        const { title, description, category, variants } = req.body;
        if (!title || !description || !category || !variants) {
            // const prodIncompleto = {title: title, description: description, category: category, variants: variants, imageUrl: !req.file ? undefined : true};
            throw new CustomError('Faltan datos', 'Faltan campos', 2);
        }
        if (!req.files && req.files.length <= 0) throw new CustomError('Missing data', 'Debes subir una imagen', 2);
        const imagesUrl = [];
        for (const file of req.files) {
            const params = {
                Bucket: config.awsBucket,
                Key: file.originalname,
                Body: file.buffer
            }
            utils.s3.upload(params).promise();
            imageUrl = `https://${config.awsBucket}.s3.${config.awsRegion}.amazonaws.com/${file.originalname}`;
            imagesUrl.push(imageUrl);

        };
        const producto = new ProductDTO(title, description, variants, imagesUrl, category);
        await ProductManager.create(producto);
        return res.status(200).send({ status: 'succes', message: 'Producto creado!' });
    } catch (error) {
        next(error);
    }
}

const update = async (req, res, next) => {
    try {
        const { pid } = req.params;
        if (!pid) throw new CustomError('Invalid data', 'Id inválido', 1);
        const { field, value, subId, sizeId } = req.body;
        if (!field || !value) throw new CustomError('Missing data', `${!field && !value ? 'Proporciona un campo a actualizar con su valor' : !field && value ? 'Elige un campo a actualizar' : !value && field ? 'Ingresa un valor para el campo' : ''}`, 2);
        if(subId && !sizeId) await ProductManager.update(field, value, pid, subId);
        if(subId && sizeId) await ProductManager.update(field, value, pid, subId, sizeId);
        if(!subId) await ProductManager.update(field, value, pid);
        return res.status(200).send({ status: 'succes', message: 'Producto actualizado!' });
    } catch (error) {
        next(error);
    }
}

const updateImage = async (req, res, next) => {
    try {
        const { pid } = req.params;
        if (!pid) throw new CustomError('Invalid data', 'Id inválido', 1);
        if (!req.file) throw new CustomError('Missing data', 'Debes subir un archivo', 2);
        const product = await ProductManager.getById(pid);
        const params = { Bucket: config.awsBucket, Key: product.key };
        utils.s3.deleteObject(params, (err, data) => {
            if (err) throw new CustomError('Error en la bdd', `Error al borrar el archivo: ${err}`, 5);
        });
        const paramsImage = {
            Bucket: config.awsBucket,
            Key: req.file.originalname,
            Body: req.file.buffer
        }
        utils.s3.upload(paramsImage).promise();
        const imageUrl = `https://${config.awsBucket}.s3.${config.awsRegion}.amazonaws.com/${req.file.originalname}`;
        await ProductManager.update('imageUrl', imageUrl, pid);
        await ProductManager.update('key', req.file.originalname, pid);
        return res.status(200).send({ status: 'succes', message: 'Imagen actualizada!' });
    } catch (error) {
        next(error);
    }
}

const remove = async (req, res, next) => {
    try {
        const { pid } = req.params;
        if (!pid) throw new CustomError('Invalid data', 'Invalid ID', 1);
        const prod = await ProductManager.getById(pid);
        const params = { Bucket: config.awsBucket, Key: prod.key };
        utils.s3.deleteObject(params, (err, data) => {
            if (err) throw new CustomError('Error en la bdd', `Error al borrar el archivo: ${err}`, 5);
        })
        await ProductManager.delete(pid);
        return res.status(200).send({ status: 'succes', message: 'Producto borrado!' });
    } catch (error) {
        next(error);
    }
}

export default { getAllLimit, getById, getByCategory, getBySubCategory, create, update, remove, getAll, updateImage };