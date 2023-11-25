export class PayerDTO{
    constructor(user){
        this.name= user.name;
        this.surname= user.last_name;
        this.email= user.email;
    }
}