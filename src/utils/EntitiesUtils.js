import {uuid} from "./Utils";

const {fromJS} = require("immutable");

export const NEW_DINING_TABLE_UUID = "new-dining-table-uuid";
export const NEW_ORDINATION_UUID = "new-ordination-uuid";
export const NEW_CUSTOMER_UUID = "new-customer-uuid";

export class EntitiesUtils {
    static newDiningTable() {
        return fromJS({
            coverCharges: 0,
            waiter: null,
            table: null,
            ordinations: [],
            bills: [],
            openingTime: null,
            status: "APERTO"
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
            uuid: uuid(),
            dish: dish.get('uuid'),
            price: dish.get('price'),
            phase: phase,
            additions: []
        });
    }

    static newCustomer(){
        return fromJS({
            uuid: NEW_CUSTOMER_UUID,
            name: "",
            surname: "",
            cf: "",
            piva: "",
            address: "",
            city: "",
            cap: "",
            district: "",
        });
    }

    static newPrinter(){
        return fromJS({
            name: "",
            main: false,
            lineCharacters: 0
        });
    }

    static renderCustomer(customer){
        if(customer) {
            return customer.get('surname') + " " + customer.get('name');
        }
        return "?";
    }
}