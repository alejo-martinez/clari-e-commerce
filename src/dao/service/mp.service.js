import config from "../../config/config.js";

export class MercadoPagoManager {

    static createPreference(items, user, cid) {
        return {
            'items': items,
            'payer': user,
            'back_urls': {
                'success': `${config.urlFront}ticket/${cid}`,
                'failure': `${config.urlFront}/cart/${cid}`,
            },
            'auto_return': 'approved',
        }
    }
}