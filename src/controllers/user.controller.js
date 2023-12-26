import { UserManager } from "../dao/service/user.service.js";
import utils from "../utils.js";
import CustomError from "../errors/custom.error.js";
import { missingUserField } from "../errors/info.error.js";
import config from "../config/config.js";

const getById = async(req, res, next)=>{
    try {
        const {uid} = req.params;
        const user = await UserManager.getById(uid);
        if(!user) throw new CustomError('No user', 'No se encontró el usuario', 4);
        return res.status(200).send({status:'success', payload: user});
    } catch (error) {
        next(error);
    }
}

const updateUser = async(req, res, next)=>{
    try {
        const {field, value} = req.body;
        if(!value) throw new CustomError('Missing data', missingUserField(field), 2);
        if(!field) throw new CustomError('Missing data', 'Missing field', 2);
        const {uid} = req.params;
        if(!uid) throw new CustomError('Missing data', 'Missing ID', 2);
        if(field === 'password'){
            await UserManager.updatePass(value, uid);
        } else {
            await UserManager.update(field, value, uid);
        }
        const user = await UserManager.getById(uid);
        res.clearCookie('accesToken',{sameSite:'None', secure:true});
        const accesToken = utils.generateToken(user);
        res.cookie('accesToken', accesToken, {maxAge: 60 * 60 * 2000, signed:true, httpOnly: true, secure: true, sameSite: 'none'})
        return res.status(200).send({status:'succes', message:`Usuario actualizado!`});
    } catch (error) {
        next(error);
    }
}

const resetPassword = async(req, res, next)=>{
    try {
        const {email} = req.body;
        const user = await UserManager.getByField('email', email);
        if(!user) throw new CustomError('No user', 'El usuario con el mail ingresado no existe', 4);
        await utils.transporte.sendMail({from: config.adminEmail, to: email, html:`<h3>Hola ${user.name}</h3><p>Solicitaste un cambio de contraseña, siga el siguiente link: <a href="${config.urlFront}/resetpass/${user._id}">Restaurar contraseña.</a> Si no solicitó el cambio desestime este mensaje.`});
        return res.status(200).send({status:'success', message:'Email enviado! Revise su bandeja de entrada.'});
    } catch (error) {
        next(error);
    }
}

const updatePassword = async(req, res, next)=>{
    try {
        const {uid} = req.params;
        const {password} = req.body;
        await UserManager.updatePass(password, uid);
        return res.status(200).send({status:'success', message:'Contraseña actualizada!'});
    } catch (error) {
        next(error);
    }
}

const deleteUser = async(req, res, next)=>{
    try {
        const {uid} = req.params;
        await UserManager.delete(uid);
        return res.status(200).send({status:'success', message:"Usuario eliminado"})
    } catch (error) {
        next(error);
    }
}

export default {updateUser, resetPassword, updatePassword, deleteUser, getById};