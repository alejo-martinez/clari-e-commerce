import { ProductManager } from "../dao/service/product.service.js";
import { ProductDTO } from "../dto/productDTO.js";
import CustomError from "../errors/custom.error.js";
import { missingFields } from "../errors/info.error.js";
import config from "../config/config.js";
import utils from "../utils.js";

const getAll = async(req, res, next)=>{
    try {
        const productos = await ProductManager.getAll(req);
        if(productos.length == 0) throw new CustomError('No data', 'No se encontraron productos', 4);
        return res.status(200).send(productos);
    } catch (error) {
        next(error);
    }
}

const getById = async(req, res, next)=>{
    try {
        const {pid} = req.params;
        const producto = await ProductManager.getById(pid);
        if(!producto) throw new CustomError('No data', 'No se encontró el producto', 4);
        return res.status(200).send({status:'succes', payload:producto});
    } catch (error) {
        next(error);
    }
}

const getByCategory = async(req, res, next)=>{
    try {
        const {category} = req.params;
        const productos = await ProductManager.getByCategory(category);
        if(productos.length == 0) throw new CustomError('No data', 'No se encontraron productos', 4);
        return res.status(200).send({status:'succes', payload:productos});
    } catch (error) {
        next(error);
    }
}

const getBySubCategory = async(req, res, next)=>{
    try {
        const {subcategory} = req.params;
        const productos = await ProductManager.getBySubCategory(subcategory);
        if(productos.length == 0) throw new CustomError('No data', 'No se encontraron productos')
        return res.status(200).send({status:'succes', payload: productos});
    } catch (error) {
        next(error);
    }
}

const create = async(req, res, next)=>{
    try {
        let imageUrl;
        const {title, description, price, stock, category, subCategory} = req.body;
        if(!title || !description || !price || !stock || !category || !subCategory){
            const prodIncompleto = new ProductDTO(title, description, price, stock, category, subCategory);
            throw new CustomError('Faltan datos', missingFields(prodIncompleto), 2);
        }
        if(!req.file) throw new CustomError('Missing data', 'Debes subir una imagen', 2);
        const params = {
            Bucket: config.awsBucket,
            Key: req.file.originalname,
            Body: req.file.buffer
        }
        utils.s3.upload(params).promise();
        imageUrl = `https://${config.awsBucket}.s3.${config.awsRegion}.amazonaws.com/${req.file.originalname}`;
        const producto = new ProductDTO(title, description, price, stock, imageUrl, category, subCategory);
        await ProductManager.create(producto);
        return res.status(200).send({status:'succes', message: 'Product created!'});
    } catch (error) {
        next(error);        
    }
}

const update = async(req, res, next)=>{
    try {
        const {pid} = req.params;
        if(!pid) throw new CustomError('Invalid data', 'Id inválido', 1);
        const {field, value} = req.body;
        if(!field || !value) throw new CustomError('Missing data', `${!field && !value? 'Proporciona un campo a actualizar con su valor' : !field && value ? 'Elige un campo a actualizar' : !value && field ? 'Ingresa un valor para el campo' : ''}`, 2);
        await ProductManager.update(field, value, pid);
        return res.status(200).send({status:'succes', message: 'Product updated!'});
    } catch (error) {
        next(error);
    }
}

const remove = async(req, res, next)=>{
    try {
        const {pid} = req.params;
        if(!pid) throw new CustomError('Invalid data', 'Invalid ID', 1);
        await ProductManager.delete(pid);
        return res.status(200).send({status:'succes', message: 'Product deleted !'});
    } catch (error) {
        next(error);
    }
}

export default {getAll, getById, getByCategory, getBySubCategory, create, update, remove};