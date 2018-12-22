import BaseEntity from "./BaseEntity";

export default class DiningTable extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._coverCharges = dto.coverCharges;
        this._waiterId = dto.waiter;
        this._tableId = dto.table;
        this._eveningId = dto.evening;
        if (this.evening) {
            this.evening.addTable(this);
        }
        this._ordinations = dto.ordinations.slice();
        this.ordinations.forEach(ordination => {
            if (ordination) {
                ordination.diningTable = this;
            }
        });
        this._bills = dto.bills.slice();
        this.bills.forEach(bill => {
            if (bill) {
                bill.diningTable = this;
            }
        });
        this._openingTime = new Date(dto.openingTime);
        this._status = dto.status;
    }

    toDto() {
        const dto = super.toDto();
        dto.coverCharges = this._coverCharges;
        dto.waiter = this._waiterId;
        dto.table = this._tableId;
        dto.evening = this._eveningId;
        dto.ordinations = this._ordinations.slice();
        dto.bills = this._bills.slice();
        dto.openingTime = this._openingTime;
        dto.status = this._status;
        return dto;
    }

    static create(dto, pool) {
        return new DiningTable(dto, pool);
    }


    get coverCharges() {
        return this._coverCharges;
    }

    set coverCharges(value) {
        this._coverCharges = value;
    }

    get waiter() {
        return this.getEntity(this._waiterId);
    }

    set waiter(waiter) {
        this._waiterId = waiter.uuid;
    }

    get table() {
        return this.getEntity(this._tableId);
    }

    set table(table) {
        this._tableId = table.uuid;
    }

    get evening() {
        return this.getEntity(this._eveningId);
    }

    set evening(evening) {
        this._eveningId = evening.uuid;
    }

    addOrdination(ordination) {
        if (ordination) {
            const index = this._ordinations.indexOf(ordination.uuid);
            if (index === -1) {
                this._ordinations.push(ordination.uuid);
            }
            ordination.table = this;
        }
    }

    removeOrdination(ordination) {
        if (ordination) {
            const index = this._ordinations.indexOf(ordination.uuid);
            if (index !== -1) {
                this._ordinations.splice(index, 1);
                ordination.table = null;
            }
        }
    }

    get ordinations() {
        return this.getEntities(this._ordinations);
    }

    get bills() {
        return this.getEntities(this._bills);
    }

    addBill(bill) {
        if (bill) {
            const index = this._bills.indexOf(bill.uuid);
            if (index === -1) {
                this._bills.push(bill.uuid);
            }
            bill.diningTable = this;
        }
    }

    removeBill(bill) {
        if (bill) {
            const index = this._bills.indexOf(bill.uuid);
            if (index !== -1) {
                this._bills.splice(index, 1);
                bill.table = null;
            }
        }
    }

    removeBillUuid(uuid) {
        const index = this._bills.indexOf(uuid);
        if (index !== -1) {
            this._bills.splice(index, 1);
        }
    }

    get openingTime() {
        return this._openingTime;
    }

    set openingTime(value) {
        this._openingTime = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    listOrders() {
        const orders = [];
        this.ordinations.forEach(ordination => {
            if (ordination) {
                orders.push(...ordination.orders);
            }
        });
        return orders;
    }

    hasZeroPrices(){
        for(let order of this.listOrders()){
            if(order.price === 0){
                return true;
            }
        }
        return false;
    }

    canBeClosed(){
        let closedCcs = 0;
        let closedOrders = 0;
        this.bills.forEach(bill => {
            closedCcs += bill.coverCharges;
            closedOrders += bill.orders.length;
        });
        return closedCcs === this.coverCharges && closedOrders === this.listOrders().length;
    }

    listOpenedOrders(){
        return this.listOrders()
            .filter(order => !order.bill);
    }

    listOpenedCoverCharges(){
        let ccs = this.coverCharges;
        this.bills.forEach(bill => ccs -= bill.coverCharges);
        return ccs;
    }

    getCoverChargesPrice(){
        return this.coverCharges * this.evening.coverCharge;
    }
}