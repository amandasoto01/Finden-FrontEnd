export class InfoPortModel {
    mac: string;
    state: string;
    speed: string;
    found: boolean;
    floor: number;
    wiringCenter: string;
    building: string;

    constructor (){
        this.mac = '';
        this.state = '';
        this.speed = '';
        this.found = false;
        this.floor = 0;
        this.building = '';
        this.wiringCenter = '';
    }
}
