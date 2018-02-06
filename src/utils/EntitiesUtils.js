import {uuid} from "./Utils";

const {fromJS} = require("immutable");

export const NEW_DINING_TABLE_UUID = "new-dining-table-uuid";
export const NEW_ORDINATION_UUID = "new-ordination-uuid";

export class EntitiesUtils {
    static newDiningTable() {
        return fromJS({
            uuid: NEW_DINING_TABLE_UUID,
            coverCharges: 0,
            waiter: null,
            table: null,
            ordinations: [],
            bills: [],
            openingTime: null,
            closed: false
        });
    }

    static newOrdination() {
        return fromJS({
            uuid: NEW_ORDINATION_UUID,
            orders: []
        });
    }

    static newOrder(dish, phase) {
        return fromJS({
            dish: dish.get('uuid'),
            price: dish.get('price'),
            phase: phase,
            additions: []
        });
    }
}