import { PortTableModel } from './portTableModel';

export class SwitchModel {
    building: string;
    floor: number;
    
    ports: PortTableModel[];

    constructor (){
        this.building = '';
        this.floor = 0;
        this.ports = [];
    }
}

