import BaseEntity from "./BaseEntity";

export class BillType {
    static INVOICE = "INVOICE";
    static RECEIPT = "RECEIPT";
}

export default class Bill extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._tableId = dto.table;
        if (this.table) {
            this.table.addBill(this);
        }
        this._printTime = dto.printTime;
        this._progressive = dto.progressive;
        this._customerId = dto.customer;
        this._orders = dto.orders.slice();
        this.orders.forEach(order => {
            if (order) {
                order.bill = this;
            }
        });
        this._coverCharges = dto.coverCharges;
        this._total = dto.total;
    }

    toDto() {
        const dto = super.toDto();
        dto.table = this._tableId;
        dto.printTime = this._printTime;
        dto.progressive = this._progressive;
        dto.orders = this._orders;
        dto.coverCharges = this._coverCharges;
        dto.total = this._total;
        dto.customer = this._customerId;
        return dto;
    }

    static create(dto, pool) {
        return new Bill(dto, pool);
    }

    get table() {
        return this.getEntity(this._tableId);
    }

    set table(table) {
        if (BaseEntity.equals(this.table, table)) {
            return;
        }
        if (this.table) {
            this.table.removeBill(this);
        }
        this._tableId = null;
        if (table) {
            this._tableId = table.uuid;
            this.table.addBill(this);
        }
    }

    get printTime() {
        return this._printTime;
    }

    set printTime(value) {
        this._printTime = value;
    }

    get progressive() {
        return this._progressive;
    }

    set progressive(value) {
        this._progressive = value;
    }

    get customer() {
        return this.getEntity(this._customerId);
    }

    set customer(customer) {
        this._customerId = customer.uuid;
    }

    get orders() {
        return this.getEntities(this._orders);
    }

    addOrder(order) {
        if (this._orders.includes(order.uuid)) {
            return;
        }
        this._orders.push(order.uuid);
        order.bill = this;
    }

    removeOrder(order) {
        const index = this._orders.findIndex(o => o === order.uuid);
        if (index !== -1) {
            this._orders.splice(index, 1);
            order.bill = null;
        }
    }

    removeOrders() {
        while (this._orders.length > 0) {
            const order = this.orders[0];
            this._orders.splice(0, 1);
            order.bill = null;
        }
    }

    get coverCharges() {
        return this._coverCharges;
    }

    set coverCharges(value) {
        this._coverCharges = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }

    isGeneric() {
        return !this.printTime;
    }

    isInvoice() {
        return this.printTime && this.customer;
    }

    isReceipt() {
        return this.printTime && !this.customer;
    }
}