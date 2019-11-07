export class TablePlanesModel {
    name: string;
    description: string;
    version: any;
    descarga: {
        name: string;
        version: string;
    }
    acciones:{
        name:string;
    }

    constructor (){
        this.name = '';
        this.description = '';
        this.version = '';
        this.descarga = {
            'name': '',
            'version': '',
        }
        this.acciones = {
            name :'',
        }
    }
}
