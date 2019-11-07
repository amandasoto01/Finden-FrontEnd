export class PortTableModel{
    port: string;
    switch: number;
    portSwitch: number;
    type: string;
    wiringCenter: string;

    constructor (){
        this.port = '';
        this.switch = 0;
        this.portSwitch = 0;
        this.type = '';
        this.wiringCenter = '';
    }
}