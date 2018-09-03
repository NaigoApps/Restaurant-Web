import BaseEntity from "./BaseEntity";

export default class Addition extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._price = dto.price;
        this._generic = dto.generic;
    }

    static create(dto, pool) {
        return new Addition(dto, pool);
    }

    get name() {
        return this._name;
    }

    get price() {
        return this._price;
    }

    get generic() {
        return this._generic;
    }

    toDto() {
        const result = super.toDto();
        result.name = this._name;
        result.price = this._price;
        result.generic = this._generic;
    }
}