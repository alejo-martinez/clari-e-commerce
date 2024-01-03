import config from "../../config/config.js";

export class MercadoPagoManager {

    static createPreference(items, user, cid) {
        return {
            'items': items,
            'payer': user,
            'back_urls': {
                'success': `${config.urlFront}/cart/${cid}`,
                'failure': config.urlFront,
            },
            'auto_return': 'approved',
            'payment_methods': {
                'excluded_payment_methods': [],
                'excluded_payment_types': [],
                'installments': 1
            },
            'notification_url': 'https://clari-e-commerce-production.up.railway.app/api/mercadopago/createticket',
            'statement_descriptor': 'CLARAECOMERCE',
        }
    }
}