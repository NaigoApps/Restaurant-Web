import BaseEntity from "./BaseEntity";

export default class Ordination extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._tableId = dto.table;
        if(this.table){
            this.table.addOrdination(this);
        }
        this._creationTime = dto.creationTime;
        this._progressive = dto.progressive;
        this._orders = dto.orders.slice();
        this._orders.forEach(order => {
            if (order) {
                order.ordination = this;
            }
        });
        this._dirty = dto.dirty;
    }

    toDto() {
        const dto = super.toDto();
        dto.table = this._tableId;
        dto.creationTime = this._creationTime;
        dto.progressive = this._progressive;
        dto.orders = this._orders.slice();
        dto.dirty = this._dirty;
        return dto;
    }

    static create(dto, pool) {
        return new Ordination(dto, pool);
    }

    get table() {
        return this.getEntity(this._tableId);
    }

    set table(table) {
        this._tableId = table.uuid;
    }

    get creationTime() {
        return this._creationTime;
    }

    set creationTime(value) {
        this._creationTime = value;
    }

    get progressive() {
        return this._progressive;
    }

    set progressive(value) {
        this._progressive = value;
    }

    get orders() {
        return this.getEntities(this._orders);
    }

    get dirty() {
        return this._dirty;
    }

    set dirty(value) {
        this._dirty = value;
    }
}