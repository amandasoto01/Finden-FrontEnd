export class PortTableModel{
    name: string;
    port: string;
    switch: number;
    NPortSwitch: number;
    type: string;
    wiringCenter: string;

    constructor (){
        this.name = '';
        this.port = '';
        this.switch = 0;
        this.NPortSwitch = 0;
        this.type = '';
        this.wiringCenter = '';
    }
}