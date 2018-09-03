import BaseEntity from "./BaseEntity";

export default class Printer extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._lineCharacters = dto.lineCharacters;
    }

    static create(dto, pool) {
        return new Printer(dto, pool);
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get lineCharacters() {
        return this._lineCharacters
    }

    set lineCharacters(lcs) {
        this._lineCharacters = lcs;
    }

    toDto() {
        const result = super.toDto();
        result.name = this._name;
        result.lineCharacters = this._lineCharacters;
        return result;
    }
}