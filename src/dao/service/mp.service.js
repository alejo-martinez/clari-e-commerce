import config from "../../config/config.js";

export class MercadoPagoManager {

    static createPreference(items, user, cid) {
        return {
            'items': items,
            'payer': user,
            'back_urls': {
                'success': `${config.urlFront}/cart/${cid}`,
                'pending': `${config.urlFront}/cart/${cid}`,
                'failure': `${config.urlFront}/cart/${cid}`,
            },
            'auto_return': 'approved',
            'payment_methods': {
                'excluded_payment_methods': [],
                'excluded_payment_types': [{id:'ticket'}],
                'installments': 1
            },
            // 'notification_url': `${config.notificationUrl}/api/mercadopago/createticket`,
            'notification_url': `https://left-mile-noble-gives.trycloudflare.com/api/mercadopago/createticket`,
            'statement_descriptor': 'Clara blanco y hogar'
        }
    }
}