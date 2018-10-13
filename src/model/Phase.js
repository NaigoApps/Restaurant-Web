import BaseEntity from "./BaseEntity";

export default class Phase extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._priority = dto.priority;
    }

    toDto() {
        const dto = super.toDto();
        dto.name = this._name;
        dto.priority = this._priority;
        return dto;
    }

    static create(dto, pool) {
        return new Phase(dto, pool);
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }
}