import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

import config from './config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cookieExtractor = (req) => {
    let token = null;
    if (req && req.signedCookies) {
        token = req.signedCookies['accesToken']
    }
    return token;
}

const generateToken = (user) => {
    const token = jwt.sign({ user }, config.jwtSecret, { expiresIn: '24h' });
    return token;
}

const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
}

const transporte = nodemailer.createTransport({service:'gmail', port:587, auth:{user:config.adminEmail, pass:config.adminPass}});

export default {__dirname, cookieExtractor, generateToken, createHash, isValidPassword, transporte};