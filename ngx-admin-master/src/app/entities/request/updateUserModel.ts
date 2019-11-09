export class UpdateUserModel{
    name: string;
    email: string;
    type: number;

    constructor (){
        this.name = '';
        this.email = '';
        this.type = 0;
    }
}