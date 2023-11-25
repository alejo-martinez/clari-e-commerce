import { MercadoPagoConfig } from "mercadopago"; "mercadopago";

import config from "./config.js";

export const client = new MercadoPagoConfig({accessToken: config.accesTokenMP});