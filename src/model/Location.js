import BaseEntity from "./BaseEntity";

export default class Location extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._printerId = dto.printer;
    }

    static create(dto, pool){
        return new Location(dto, pool);
    }

    get name() {
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    get printer() {
        return this.getEntity(this._printerId);
    }

    set printer(printer) {
        this._printerId = printer.uuid;
    }

    toDto(){
        const result = super.toDto();
        result.name = this._name;
        result.printer = this._printerId;
        return result;
    }


}