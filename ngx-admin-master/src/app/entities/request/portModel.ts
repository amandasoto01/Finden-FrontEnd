export class PortModel {
    building: string;
    floor: number;
    portName: string;
    switch: number;
    portSwitch: number;
    type: string;
    wiringCenter: string;

    constructor (){
        this.building = '';
        this.floor = 0;
        this.portName = '';
        this.switch = 0;
        this.portSwitch = 0;
        this.type = '';
        this.wiringCenter = '';
    }
}