import utils from "../utils.js";
import CustomError from "../errors/custom.error.js";

const createUser = async(req, res, next)=>{
    try {
        return res.send({ status: 'succes', message: 'Usuario creado!' });
    } catch (error) {
        next(error);
    }
}

const userLogued = async(req, res, next)=>{
    try {
        const user = req.user;
        const accesToken = utils.generateToken(user);
        res.cookie('accesToken', accesToken, {maxAge: 60 * 60 * 2000, signed:true, httpOnly: true, secure: true, sameSite: 'none'}).send({status:'succes', message:`Bienvenidx ${user.name} !`, payload:user});
    } catch (error) {
        next(error);
    }
}

const logOut = async (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send({ status: 'error', message: 'No pudimos cerrar la sesion: ' + error });
        }
        else {
            res.clearCookie('accesToken',{sameSite:'None', secure:true}).send({ status: 'succes', message: 'Sesión cerrada con éxito !' })
        }
    })
}

const current = async (req, res, next) =>{
    try {
        const user = req.user;
        // if(!user) throw new CustomError('No user', 'No existe usuario logueado', 4);
        return res.status(200).send({status:'succes', payload: user});
    } catch (error) {
        next(error)
    }
}

export default {createUser, userLogued, logOut, current};