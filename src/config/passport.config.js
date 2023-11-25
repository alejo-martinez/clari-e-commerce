import passport from "passport";
import local from 'passport-local';
import jwt from 'passport-jwt';
import utils from "../utils.js";
import config from "./config.js";

import { UserDTO } from "../dto/userDTO.js";
import { UserManager } from "../dao/service/user.service.js";
import { CartManager } from "../dao/service/cart.service.js";

const JWTstrategy = jwt.Strategy;
const localStrategy = local.Strategy;

const ExtractJwt = jwt.ExtractJwt;

const initPassport = ()=> {
    passport.use('jwt', new JWTstrategy({
        jwtFromRequest: ExtractJwt.fromExtractors([utils.cookieExtractor]),
        secretOrKey: config.jwtSecret
    }, async(jwt_payload, done)=>{
        try {
            return done(null, jwt_payload.user)
        } catch (error) {
            done(error)
        }
    }))

    passport.use('register', new localStrategy({
        passReqToCallback: true, usernameField: 'email'
    }, async(req, username, passport, done)=>{
        const {name, second_name, last_name, email, password} = req.body;
        try {
            if(!name || !last_name || !email || !password) return done(null, false, {message:'Debes completar los campos obligatorios'});
            const user = await UserManager.getByField('email', email);
            if(user){
                return done(null, false, {message:'Error, email en uso'});
            } 
            else {
                const cart = await CartManager.create();
                const usuario = new UserDTO(name, second_name, last_name, email, password);
                usuario.cart = cart._id;
                await UserManager.create(usuario);
                return done(null, usuario);
            }
        } catch (error) {
            return done('Error al hacer el registro: ' + error)
        }
    }))

    passport.use('login', new localStrategy({
        passReqToCallback: true, usernameField:'email'
    }, async(req, username, pass, done)=>{
        try {
            const {password} = req.body;
            // console.log(password);
            // console.log(passport);
            const user = await UserManager.getWithPassword('email', username);
            if(!password || !username) done(null, false, {message:'Debes completar todos los campos'});
            if(!user || !utils.isValidPassword(user, password)) done(null, false, {message: 'Email o contraseña incorrecta'});
            else{
                const usuario = await UserManager.getByField('email', username);
                done(null, usuario, {message:'Usuario logueado!'});
            } 
        } catch (error) {
            return done('Error al iniciar sesión: ' + error);
        }
    }))

    passport.serializeUser((user, done)=>{
        done(null, user._id);
    })

    passport.deserializeUser(async(id, done)=>{
        let usuario = await UserManager.getById(id);
        done(null, usuario);
    })
}

export default initPassport;