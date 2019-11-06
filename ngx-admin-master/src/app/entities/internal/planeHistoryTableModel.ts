export class PlaneHistoryTableModel {
    name: string;
    description: string;
    version: any;
    approvedBy: string;
    date: string;
    descarga: {
        name: string;
        version: string;
    }

    constructor (){
        this.name = '';
        this.description = '';
        this.version = '';
        this.approvedBy = '';
        this.date = '';
        this.descarga = {
            'name': '',
            'version': ''
        }
    }
}
