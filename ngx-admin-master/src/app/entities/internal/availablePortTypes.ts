export class AvailablePortTypes {
    value: string;
    name: string;

    constructor(_value?, _type?){
        this.value = _value ? _value: '';
        this.name = _type ? _type : '';
    }
}
