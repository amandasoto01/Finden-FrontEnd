export class UserModel {
    name: string;
    email: string;
    password: string;
    type: number;

    constructor (){
        this.name = '';
        this.email = '';
        this.password = '';
        this.type = 0;
    }
}
