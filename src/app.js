import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import cors from 'cors';
import path from 'path';


import utils from './utils.js';
import config from './config/config.js';
import initPassport from './config/passport.config.js';
import handleErrors from './middlewares/error.middleware.js';

import sessionRouter from './routes/session.router.js';
import userRouter from './routes/user.router.js';
import productRouter from './routes/product.router.js';
import cartRouter from './routes/cart.router.js';
import mpRouter from './routes/mp.router.js';
import ticketRouter from './routes/ticket.router.js';
import getnetRouter from './routes/getnet.router.js';

const port = parseFloat(config.port) || 3012;
const app = express();


const server = app.listen(port, ()=> console.log(`Server listen on port: ${port}`));

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.dbUrl,
        ttl: 60 * 60 * 2
    }),
    secret: config.secretKey,
    resave: false,
    saveUninitialized: false,
    cookie:{secure: true}
}));

initPassport();

app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser(config.secretCookieCode));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({origin:[config.urlFront, 'https://www.mercadopago.com'], credentials:true, methods:'GET, POST, PUT, DELETE'}));


app.use('/static', express.static(utils.__dirname + '/public'));
app.use(express.static(path.join(utils.__dirname, 'views')));
app.use(express.static(utils.__dirname + '/public'));

app.use('/api/session', sessionRouter);
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/mercadopago', mpRouter);
app.use('/api/ticket', ticketRouter);
app.use('/api/getnet', getnetRouter);

mongoose.connect(config.dbUrl);

app.use(handleErrors);