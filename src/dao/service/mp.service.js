

export class MercadoPagoManager {

    static createPreference(items, user) {
        return {
            'items': items,
            'payer': user,
            'installments': 1
        }
    }
}