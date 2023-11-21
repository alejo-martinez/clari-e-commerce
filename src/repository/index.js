import { ProductManager } from "./productManager.service.js";
import { articuloModel } from "../dao/models/articulo.model.js";
import { velaModel } from "../dao/models/vela.model.js";
import { mantaModel } from "../dao/models/manta.model.js";
import { florModel } from "../dao/models/flor.model.js";

export const articuloManager = new ProductManager(articuloModel, 'articulo');
export const velaManager = new ProductManager(velaModel);
export const mantaManager = new ProductManager(mantaModel, 'manta');
export const florManager = new ProductManager(florModel);