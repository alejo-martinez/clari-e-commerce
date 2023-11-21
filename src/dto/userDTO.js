import utils from "../utils.js";

export class UserDTO{
    constructor(name, second_name, last_name, email, password){
        this.name= name;
        this.second_name = second_name;
        this.last_name = last_name;
        this.email = email;
        this.password = utils.createHash(password);
    }
}