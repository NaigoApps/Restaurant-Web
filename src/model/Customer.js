import BaseEntity from "./BaseEntity";

export default class Customer extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._surname = dto.surname;
        this._cf = dto.cf;
        this._piva = dto.piva;
        this._address = dto.address;
        this._cap = dto.cap;
        this._city = dto.city;
        this._district = dto.district;
    }

    static create(dto, pool) {
        return new Customer(dto, pool);
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get surname() {
        return this._surname;
    }

    set surname(surname) {
        this._surname = surname;
    }

    get cf() {
        return this._cf;
    }

    set cf(cf) {
        this._cf = cf;
    }

    get piva() {
        return this._piva;
    }

    set piva(piva) {
        this._piva = piva;
    }

    get address() {
        return this._address;
    }

    set address(address) {
        this._address = address;
    }

    get cap() {
        return this._cap;
    }

    set cap(cap) {
        this._cap = cap;
    }

    get city() {
        return this._city;
    }

    set city(city) {
        this._city = city;
    }

    get district() {
        return this._district;
    }

    set district(district) {
        this._district = district;
    }

    toDto() {
        const result = super.toDto();
        result.name = this._name;
        result.surname = this._surname;
        result.cf = this._cf;
        result.piva = this._piva;
        result.address = this._address;
        result.cap = this._cap;
        result.city = this._city;
        result.district = this._district;
        return result;
    }
}