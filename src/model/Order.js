import BaseEntity from "./BaseEntity";

export default class Order extends BaseEntity {
    constructor(dto, pool) {
        super(dto.uuid, pool);
        this._ordinationId = dto.ordination;
        if(this.ordination){
            this.ordination.addOrder(this);
        }
        this._dishId = dto.dish;
        this._additions = dto.additions.slice();
        this._price = dto.price;
        this._notes = dto.notes;
        this._phaseId = dto.phase;
        this._billId = dto.bill;
        if(this.bill){
            this.bill.addOrder(this);
        }
    }

    toDto() {
        const dto = super.toDto();
        dto.ordination = this._ordinationId;
        dto.dish = this._dishId;
        dto.additions = this._additions.slice();
        dto.price = this._price;
        dto.notes = this._notes;
        dto.phase = this._phaseId;
        dto.bill = this._billId;
        return dto;
    }

    static create(dto, pool) {
        return new Order(dto, pool);
    }


    get ordination() {
        return this.getEntity(this._ordinationId);
    }

    set ordination(ordination) {
        this._ordinationId = ordination.uuid;
    }

    get dish() {
        return this.getEntity(this._dishId);
    }

    set dish(dish) {
        this._dishId = dish.uuid;
    }

    get additions() {
        return this.getEntities(this._additions);
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get notes() {
        return this._notes;
    }

    set notes(value) {
        this._notes = value;
    }

    get phase() {
        return this.getEntity(this._phaseId);
    }

    set phase(phase) {
        this._phaseId = phase.uuid;
    }

    get bill() {
        return this.getEntity(this._billId);
    }

    set bill(bill) {
        this._billId = bill.uuid;
    }
}