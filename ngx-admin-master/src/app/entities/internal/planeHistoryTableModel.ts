export class PlaneHistoryTableModel {
    name: string;
    description: string;
    status: string;
    version: any;
    descarga: {
        name: string;
        version: string;
    }
    observation: string;

    constructor (){
        this.name = '';
        this.description = '';
        this.version = '';
        this.status = '';
        this.descarga = {
            'name': '',
            'version': ''
        }
        this.observation = '';
    }
}
