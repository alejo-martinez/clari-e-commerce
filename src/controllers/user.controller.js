import { UserManager } from "../dao/service/user.service.js";
import utils from "../utils.js";

const updateUser = async(req, res, next)=>{
    try {
        const {field, value} = req.body;
        const {uid} = req.params;
        await UserManager.update(field, value, uid);
        const user = await UserManager.getById(uid);
        res.clearCookie('accesToken',{sameSite:'None', secure:true});
        const accesToken = utils.generateToken(user);
        res.cookie('accesToken', accesToken, {maxAge: 60 * 60 * 2000, signed:true, httpOnly: true, secure: true, sameSite: 'none'})
        return res.status(200).send({status:'succes', message:`Se actualizó el: ${field}`});
    } catch (error) {
        next(error);
    }
}

const resetPassword = async(req, res, next)=>{
    try {
        const {uid} = req.params;
        await UserManager.resetPass(uid);
        return res.status(200).send({status:'success', message:'Contraseña reseteada!'});
    } catch (error) {
        next(error);
    }
}

const updatePassword = async(req, res, next)=>{
    try {
        const {uid} = req.params;
        const {password} = req.body;
        await UserManager.updatePass(password, uid);
        return res.status(200).send({status:'success', message:'Contraseña actualizada !'});
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

export default {updateUser, resetPassword, updatePassword, deleteUser};