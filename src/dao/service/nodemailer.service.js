import utils from "../../utils.js";
import config from "../../config/config.js";

export class NodemailerManager{
    static async sendUrlRessetPass(user){
        try {
            await utils.transporte.sendMail({from:config.adminEmail, to:user.email, subject:'Cambio de contraseña', text:`Hola ${user.name}, solicitaste un cambio de contraseña. Si no fue así desestima este mensaje, de lo contrario acceda al siguiente enlace: `})
        } catch (error) {
            return error;
        }
    }

    static async sendEmailTicket(user, ticket, pdfTicket){
        await utils.transporte.sendMail({from:config.adminEmail, to: user.email, subject: 'Info de compra', html:`<div>
        <h2>Su orden de compra, ${user.name}</h2> 
        <p>Su compra de ${ticket.quantity} productos por un total de $${ticket.amount} se realizó con éxito. Su id de orden es: ${ticket._id}. Adjuntamos un pdf con su orden, muchas gracias por comprar en nuestra tienda !</p>
    </div>`, attachments:[{filename: `orden_compra_${user.name}.pdf`, content:pdfTicket, contentType:'application/pdf'}]})
    }
};