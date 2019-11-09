export class PortTableModel{
    name: string;
    port: string;
    switch: number;
    nPortSwitch: number;
    type: string;
    wiringCenter: string;

    constructor (){
        this.name = '';
        this.port = '';
        this.switch = 0;
        this.nPortSwitch = 0;
        this.type = '';
        this.wiringCenter = '';
    }
}