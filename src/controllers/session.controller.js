import utils from "../utils.js";

const createUser = async(req, res)=>{
    try {
        return res.send({ status: 'succes', message: 'Usuario creado!' });
    } catch (error) {
        console.log(error);
    }
}

const userLogued = async(req, res)=>{
    try {
        const user = req.user;
        const accesToken = utils.generateToken(user);
        res.cookie('accesToken', accesToken, {maxAge: 60 * 60 * 2000, signed:true, httpOnly: true, secure: true, sameSite: 'none'}).send({status:'succes', message:`Bienvenidx ${user.name} !`});
    } catch (error) {
        console.log(error);
    }
}

const logOut = async (req, res) => {
    req.session.destroy(error => {
        if (error) {
            res.send({ status: 'error', message: 'No pudimos cerrar la sesion: ' + error });
        }
        else {
            res.clearCookie('accesToken').send({ status: 'succes', message: 'Sesión cerrada con éxito !' })
        }
    })
}

const current = async (req, res) =>{
    try {
        const user = req.user;
        console.log(user);
        res.status(200).send({status:'succes', payload: user});
    } catch (error) {
        console.log(error);
    }
}

export default {createUser, userLogued, logOut, current};