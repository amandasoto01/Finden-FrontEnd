//Clase utilizada para el servicio de agregar edificio
export class BuildingModel {
    name: string;
    buildingNumber: number;
    floor: number;
    basement: number;

    constructor (){
        this.name = '';
        this.buildingNumber = 0;
        this.floor = 0;
        this.basement = 0;
    }
}
