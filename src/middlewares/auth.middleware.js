import jwt from 'jsonwebtoken';
import utils from '../utils.js';
import config from '../config/config.js';

export const authToken = (req, res, next) => {
    const token = utils.cookieExtractor(req);
    if (!token) {
        req.user = undefined;
        return next();
    }
    else {
        jwt.verify(token, config.jwtSecret, (error, credentials) => {
            if (error) return res.status(403).send({status:'error', error: 'not authorized' })
            else {
                req.user = credentials.user;
                next()
            }
        });
    }
}

export const adminUser = (req, res, next) =>{
    const admin = 'admin';
    try {
        if(req.user && req.user.rol === admin) next();
        else throw new Error('Sin permisos, No tienes los permisos para realizar esta acción');
    } catch (error) {
        next(error);
    }
};