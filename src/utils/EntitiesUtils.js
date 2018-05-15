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
            orders: []
        });
    }

    static newBill() {
        return fromJS({
            orders: [],
            total: 0,
            coverCharges: 0
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

    static duplicateOrder(order) {
        return order.set('uuid', uuid());
    }

    static newCustomer() {
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

    static newPrinter() {
        return fromJS({
            name: "",
            main: false,
            lineCharacters: 0
        });
    }

    static newLocation() {
        return fromJS({
            name: "",
            printer: ""
        });
    }

    static newRestaurantTable() {
        return fromJS({
            name: ""
        });
    }

    static newWaiter(){
        return fromJS({
            name: "",
            surname: "",
            cf: "",
            status: ""
        });
    }

    static newCategory() {
        return fromJS({
            name: "",
            location: null,
            dishes: []
        });
    }

    static newDish() {
        return fromJS({
            name: "",
            price: 0.0,
            description: "",
            category: ""
        });
    }

    static newAddition() {
        return fromJS({
            name: "",
            price: 0,
            generic: false
        });
    }

    static renderCustomer(customer) {
        if (customer) {
            return customer.get('surname') + " " + customer.get('name');
        }
        return "?";
    }
}