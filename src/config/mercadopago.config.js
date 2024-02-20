import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

import config from "./config.js";

export const client = new MercadoPagoConfig({accessToken: config.accesTokenMP});

export const payment = new Payment(client);

export const preference = new Preference(client);