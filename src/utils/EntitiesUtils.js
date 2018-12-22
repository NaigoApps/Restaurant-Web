import {uuid} from "./Utils";
import DishStatus from "../model/DishStatus";
import {formatDate} from "../components/widgets/inputs/DateInput";

const {fromJS} = require("immutable");

export const NEW_CUSTOMER_UUID = "new-customer-uuid";

export class EntitiesUtils {
    static nameComparator(e1, e2) {
        return e1.name.localeCompare(e2.name);
    }

    static defaultComparator(property){
        return (e1, e2) => {
            if (e1[property] < e2[property]) {
                return -1
            } else if (e1[property] > e2[property]) {
                return +1;
            }
            return 0;
        }
    }

    static newDiningTable() {
        return {
            coverCharges: 0,
            waiter: null,
            table: null,
            ordinations: [],
            bills: [],
            openingTime: null,
            status: "APERTO"
        }
    }

    static newOrdination(table) {
        return {
            uuid: uuid(),
            table: table.uuid,
            orders: []
        };
    }

    static newBill(table) {
        return {
            uuid: uuid(),
            table: table.uuid,
            orders: [],
            total: 0,
            coverCharges: 0
        };
    }

    static newOrder(dish, phase, ordination) {
        return {
            uuid: uuid(),
            dish: dish.uuid,
            price: dish.price,
            phase: phase.uuid ,
            additions: [],
            ordination: ordination.uuid
        };
    }

    static duplicateOrder(order) {
        return order.set('uuid', uuid());
    }

    static newCustomer() {
        return {
            uuid: NEW_CUSTOMER_UUID,
            name: "",
            surname: "",
            cf: "",
            piva: "",
            address: "",
            city: "",
            cap: "",
            district: "",
        };
    }

    static newPrinter() {
        return fromJS({
            name: "",
            main: false,
            lineCharacters: 0
        });
    }

    static newLocation() {
        return {
            name: "",
            printer: ""
        }
    }

    static newRestaurantTable() {
        return fromJS({
            name: ""
        });
    }

    static newWaiter() {
        return {
            name: "",
            surname: "",
            cf: "",
            status: ""
        }
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
        return {
            name: "",
            price: 0,
            generic: false
        };
    }

    static renderCustomer(customer) {
        if (customer) {
            return customer.surname + " " + customer.name;
        }
        return "?";
    }

    static renderEvening(evening){
        return "Serata " + formatDate(evening.day);
    }
}