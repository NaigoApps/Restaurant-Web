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


    static mergeOrder(orders, order) {
        let found = false;
        orders.forEach(o => {
            if(OrdinationsUtils.sameOrder(o.order, order)){
                o.quantity++;
                found = true;
            }
        });
        if(!found){
            orders.push({
                order: order,
                quantity: 1
            })
        }
    }

    static sameOrder(o1, o2) {
        if (o1.dish !== o2.dish) {
            return false;
        }
        if (o1.notes || o2.notes) {
            return false;
        }
        let ok = true;
        ok &= o1.additions.every(addition => o2.additions.includes(addition));
        ok &= o2.additions.every(addition => o1.additions.includes(addition));
        return ok;
    }

    static makeOrder(dish, phase, price, ordination){
        return {
            dish: dish,
            phase: phase,
            price: price,
            ordination: ordination,
            additions: []
        }
    }
}