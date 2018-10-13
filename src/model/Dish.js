import BaseEntity from "./BaseEntity";

export default class Dish extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._price = dto.price;
        this._description = dto.description;
        this._categoryId = dto.category;
        if(this.category){
            this.category.addDish(this);
        }
        this._status = dto.status;
    }

    toDto() {
        const dto = super.toDto();
        dto.name = this._name;
        dto.description = this._description;
        dto.price = this._price;
        dto.category = this._categoryId;
        dto.status = this._status;
        return dto;
    }

    static create(dto, pool) {
        return new Dish(dto, pool);
    }

    get name() {
        return this._name;
    }

    get description() {
        return this._description;
    }

    get price() {
        return this._price;
    }

    get category() {
        return this.getEntity(this._categoryId);
    }

    get status() {
        return this._status;
    }


    set name(name) {
        this._name = name;
    }

    set price(price) {
        this._price = price;
    }

    set description(description) {
        this._description = description;
    }

    set category(category) {
        this._categoryId = category.uuid;
    }

    set status(status) {
        this._status = status;
    }
}