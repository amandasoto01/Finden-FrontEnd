export class InfoPortModel {
    mac: string;
    state: string;
    description: string;
    speed: string;
    found: boolean;

    constructor (){
        this.mac = '';
        this.state = '';
        this.description = '';
        this.speed = '';
        this.found = false;
    }
}
