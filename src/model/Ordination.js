import BaseEntity from "./BaseEntity";

export default class Ordination extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._tableId = dto.table;
        if (this.table) {
            this.table.addOrdination(this);
        }
        this._creationTime = dto.creationTime;
        this._progressive = dto.progressive;
        this._orders = dto.orders.map(order => order.uuid);
        this._dirty = dto.dirty;
    }

    toDto() {
        const dto = super.toDto();
        dto.table = this._tableId;
        dto.creationTime = this._creationTime;
        dto.progressive = this._progressive;
        dto.orders = this.orders
            .map(order => order.toDto());
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
        if (BaseEntity.equals(this.table, table)) {
            return;
        }
        if (this.table) {
            this.table.removeOrdination(this);
        }
        this._tableId = null;
        if (table) {
            this._tableId = table.uuid;
            this.table.addOrdination(this);
        }
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



    addOrder(order) {
        if (order) {
            const index = this._orders.indexOf(order.uuid);
            if (index === -1) {
                this._orders.push(order.uuid);
            }
            order.ordination = this;
        }
    }

    removeOrder(order) {
        if (order) {
            const index = this._orders.indexOf(order.uuid);
            if (index !== -1) {
                this._orders.splice(index, 1);
                order.ordination = null;
            }
        }
    }

    get dirty() {
        return this._dirty;
    }

    set dirty(value) {
        this._dirty = value;
    }
}