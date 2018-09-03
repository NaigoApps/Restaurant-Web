import {uuid} from "./Utils";
import DishStatus from "../model/DishStatus";

const {fromJS} = require("immutable");

export const NEW_CUSTOMER_UUID = "new-customer-uuid";

export class EntitiesUtils {
    static nameComparator(e1, e2){
        return e1.name.localeCompare(e2.name);
    }

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
        return {
            name: "",
            location: null,
            color: 0x000000,
            dishes: [],
            additions: []
        };
    }

    static newDish() {
        return {
            name: "",
            price: 0.0,
            description: "",
            category: null,
            status: DishStatus.ACTIVE
        };
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