import {findByUuid} from "../../utils/Utils";

export default class OrdinationsUtils {

    static makePhaseMap(orders) {
        let result = new Map();
        orders.forEach(order => {
            let found = false;
            let phaseOrders = result.get(order.phase);
            if (!phaseOrders) {
                phaseOrders = [];
                result.set(order.phase, phaseOrders);
            }
            phaseOrders.push(order);
        });
        return result;
    }

    static implode(orders) {
        let result = [];
        orders.forEach(order => {
            OrdinationsUtils.mergeOrder(result, order);
        });
        return result;
    }

    static sortByDish(orders, dishes) {
        return orders.sort((o1, o2) => {
            let d1 = findByUuid(dishes, o1.order.dish);
            let d2 = findByUuid(dishes, o2.order.dish);
            if (d1 && d2) {
                return d1.name.localeCompare(d2.name);
            }
            return o1.order.dish.localeCompare(o2.order.dish);
        });
    }


    static mergeOrder(orders, order) {
        let found = false;
        orders.forEach(o => {
            if (OrdinationsUtils.sameOrder(o.order, order)) {
                o.quantity++;
                o.price += order.price;
                found = true;
            }
        });
        if (!found) {
            orders.push({
                order: order,
                quantity: 1,
                price: order.price
            })
        }
    }

    static sameGroup(g1, g2) {
        if (!g1 || !g2) {
            return false;
        }
        return g1.quantity === g2.quantity &&
            g1.price === g2.price &&
            OrdinationsUtils.sameOrder(g1.order, g2.order);
    }

    static sameOrder(o1, o2) {
        if (!o1 || !o2) {
            return false;
        }
        if (o1.dish !== o2.dish) {
            return false;
        }
        if (o1.notes || o2.notes) {
            return false;
        }
        if (o1.price !== o2.price) {
            return false;
        }
        if (o1.phase !== o2.phase) {
            return false;
        }
        let ok = true;
        ok &= o1.additions.every(addition => o2.additions.includes(addition));
        ok &= o2.additions.every(addition => o1.additions.includes(addition));
        return ok;
    }

    static makeOrder(dish, phase, price, ordination) {
        return {
            dish: dish,
            phase: phase,
            price: price,
            additions: []
        }
    }

    static duplicateOrder(order) {
        return OrdinationsUtils.makeOrder(order.dish, order.phase, order.price, order.ordination);
    }

    static total(orders) {
        let result = 0;
        orders.forEach(order => {
            result += order.price
        });
        return result;
    }

    static renderImplodedOrder(order, dishes, additions) {
        let dish = findByUuid(dishes, order.order.dish);
        let result = order.quantity + " " + (dish ? dish.name : "?");

        order.order.additions.forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.name
            }
        });

        return result;
    }

    static renderOrder(order, dishes, additions) {
        let result = dishes.find(d => d.uuid === order.dish).name;

        order.additions.forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.name
            }
        });

        return result;
    }

    static formatPrice(price) {
        return price.toFixed(2) + "€";
    }
}