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
};