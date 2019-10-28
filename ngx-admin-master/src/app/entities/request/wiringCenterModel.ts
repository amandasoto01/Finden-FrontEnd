export class WiringCenterModel {
    id: number;
    name: string;
    building: string;
    buildingNumber: number;
    floor: number;
    //falta la lista de los switches

    constructor (){
        this.name = '';
        this.id = 0;
        this.building = '';
        this.buildingNumber = 0;
        this.floor = 0;
    }
}
