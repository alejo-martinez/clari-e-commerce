import axios from "axios";
import config from "../config/config.js";

const getToken = async (req, res, next) => {
    try {
        const response = await axios.post(`https://auth.geopagos.com/oauth/token`, {
            grant_type: 'client_credentials',
            client_id: config.clientIdGetnet,
            client_secret: config.clientSecretGetnet,
            scope: '*'
        });



        res.send({ status: 'success', payload: response.data });
    } catch (error) {
        console.log(error)
        next(error);
    }
}

const initPayment = async(req, res, next) =>{
    try {
        const {token, items, idCart} = req.body;
        console.log(req.body)
        const response = await axios.post(`https://api.globalgetnet.com.ar/api/v2/orders`, {
              data: {
                attributes: {
                  currency: '032',
                  items: items, 
                  redirect_urls:{
                    success: `http://localhost:3000/cart/${idCart}/?status=success`,
                    failed: `http://localhost:3000/cart/${idCart}/?status=failed`
                  }
                }
              },
            headers: {
              'Content-Type': 'application/vnd.api+json',
              'Accept': 'application/vnd.api+json',
              'Authorization': `Bearer ${token}`
            },
            
          });
          
          res.send({status:'success', payload: 'ok'})

    } catch (error) {
        console.log(error);
        next(error);
    }
}



export default { getToken, initPayment };