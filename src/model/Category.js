import BaseEntity from "./BaseEntity";
import {EntitiesUtils} from "../utils/EntitiesUtils";

export default class Category extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._name = dto.name;
        this._locationId = dto.location;
        this._color = dto.color;
        this._dishes = dto.dishes.slice();
        this._additions = dto.additions.slice();
    }

    static create(dto, pool){
        return new Category(dto, pool);
    }

    toDto(){
        const result = super.toDto();
        result.name = this._name;
        result.color = this._color;
        result.location = this._locationId;
        result.dishes = this._dishes.slice();
        result.additions = this._additions.slice();
        return result;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        this._name = name;
    }

    get location() {
        return this.getEntity(this._locationId);
    }

    set location(location) {
        this._locationId = location.uuid;
    }

    get color() {
        return this._color;
    }

    set color(color){
        this._color = color;
    }

    get dishes() {
        return this.getEntities(this._dishes).sort(EntitiesUtils.nameComparator);
    }

    get availableDishes() {
        return this.dishes.filter(dish => dish.status === "ATTIVO").sort(EntitiesUtils.nameComparator);
    }

    get additions() {
        return this.getEntities(this._additions).sort(EntitiesUtils.nameComparator);
    }

    hasDish(dish){
        return this._dishes.includes(dish.uuid);
    }

    addDish(dish){
        if(!this.hasDish(dish)){
            this._dishes.push(dish.uuid);
        }
    }

    removeDish(dish){
        const index = this._dishes.indexOf(dish.uuid);
        if(index !== -1){
            this._dishes.splice(index, 1);
        }
    }
}