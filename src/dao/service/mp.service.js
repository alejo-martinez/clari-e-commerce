

export class MercadoPagoManager {

    static createPreference(items, payer, dateFrom, dateTo){
        try {
            return  {
                items: items,
                payer: payer,
                auto_return: 'approved',
                payment_methods: {
                  excluded_payment_methods: [],
                  excluded_payment_types: [],
                  installments: 1,
                },

                statement_descriptor: 'MARICLA',
                external_reference: 'Reference_1234',
                expires: true,
                expiration_date_from: dateFrom,
                expiration_date_to: dateTo,
              };
        } catch (error) {
            return error;
        }
    }
}

                // back_urls: {
                //   success: 'https://www.success.com',
                //   failure: 'http://www.failure.com',
                //   pending: 'http://www.pending.com',
                // },
                //                notification_url: 'https://www.your-site.com/ipn',