import BaseEntity from "./BaseEntity";

export default class Waiter extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._surname = dto.surname;
        this._cf = dto.cf;
        this._status = dto.status;
    }

    static create(dto, pool){
        return new Waiter(dto, pool);
    }

    get name() {
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    get surname() {
        return this._surname;
    }

    set surname(surname){
        this._surname = surname;
    }

    get cf() {
        return this._cf;
    }

    set cf(cf){
        this._cf = cf;
    }

    get status() {
        return this._status;
    }

    set status(status){
        this._status = status;
    }

    toDto(){
        const result = super.toDto();
        result.name = this._name;
        result.surname = this._surname;
        result.cf = this._cf;
        result.status = this._status;
        return result;
    }


}