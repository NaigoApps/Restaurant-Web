import BaseEntity from "./BaseEntity";

export default class RestaurantTable extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
    }

    static create(dto, pool){
        return new RestaurantTable(dto, pool);
    }

    get name() {
        return this._name;
    }

    set name(name){
        this._name = name;
    }

    toDto(){
        const result = super.toDto();
        result.name = this._name;
        return result;
    }


}