export class PortModel {
    building: string;
    floor: number;
    name: string;
    switch: number;
    portSwitch: number;
    type: string;
    wiringCenter: string;
    port: string;

    constructor (){
        this.building = '';
        this.floor = 0;
        this.name = '';
        this.switch = 0;
        this.portSwitch = 0;
        this.type = '';
        this.wiringCenter = '';
        this.port = '';
    }
}
