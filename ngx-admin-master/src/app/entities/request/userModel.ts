export class UserModel {
    name: string;
    email: string;
    password: string;
    type: string;

    constructor (){
        this.name = '';
        this.email = '';
        this.password = '';
        this.type = '';
    }
}
