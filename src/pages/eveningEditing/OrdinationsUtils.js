import {findByUuid} from "../../utils/Utils";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {beautifyTime} from "../../components/widgets/inputs/DateInput";

export default class OrdinationsUtils {

    static phaseComparator(o1, o2) {
        return o1.phase.priority - o2.phase.priority;
    }

    static makePhaseList(orders){
        let phaseGroups = this.makePhaseMap(orders);
        const list = [];
        phaseGroups = Array.from(phaseGroups.entries());
        phaseGroups.sort((e1, e2) => e1[0].priority - e2[0].priority);
        phaseGroups.forEach(group => list.push({phase: group[0], orders: group[1]}));
        return list;
    }

    static makePhaseMap(orders) {
        const result = new Map();
        if (orders) {
            orders.forEach(order => {
                if (!result.has(order.phase)) {
                    result.set(order.phase, []);
                }
                result.get(order.phase).push(order);
            });
        }
        return result;
    }

    static implode(orders) {
        let result = [];
        orders.forEach(order => {
            OrdinationsUtils.mergeOrder(result, order);
        });
        return result;
    }

    static sortByDish(orders) {
        return orders.sort((o1, o2) => {
            let d1 = o1.dish;
            let d2 = o2.dish;
            if (d1 && d2) {
                let cmp = d1.name.localeCompare(d2.name);
                if (cmp === 0) {
                    if (o1.additions.length > o2.additions.length) {
                        return -1;
                    } else if (o2.additions.length > o1.additions.length) {
                        return 1;
                    }
                    for (let i = 0; i < o1.additions.length; i++) {
                        let a1 = o1.additions;
                        let a2 = o2.additions;
                        if (a1 && a2) {
                            if (a1.name.localeCompare(a2.name) < 0) {
                                return -1;
                            }
                            if (a1.name.localeCompare(a2.name) > 0) {
                                return 1;
                            }
                        }
                    }
                    return 0;
                }
                return cmp;
            }
            return o1.dish.uuid.localeCompare(o2.dish.uuid);
        });
    }


    static mergeOrder(groupsList, order) {
        let found = false;
        groupsList.forEach((grp, i) => {
            if (OrdinationsUtils.sameOrder(grp, order)) {
                grp.orders.push(order);
                found = true;
            }
        });
        if (!found) {
            groupsList.push({
                groupId: groupsList.length,
                dish: order.dish,
                phase: order.phase,
                price: order.price,
                additions: order.additions,
                notes: order.notes,
                orders: [order]
            });
        }
    }

    static sameOrder(o1, o2) {
        return DiningTablesUtils.sameOrder(o1, o2) && o1.phase === o2.phase
    }

    static countOrders(orders, order) {
        let result = 0;
        orders.forEach(o => result += OrdinationsUtils.sameOrder(o, order) ? 1 : 0);
        return result;
    }

    static total(orders) {
        return orders
            .map(order => order.price)
            .reduce((p1, p2) => p1 + p2, 0);
    }

    static renderOrder(order, dishes, additions) {
        let result = dishes.find(d => d.get('uuid') === order.get('dish')).get('name');

        order.get('additions').forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.get('name')
            }
        });

        if (order.get('notes')) {
            result += " " + order.get('notes');
        }

        return result;
    }

    static renderImplodedOrder(group) {
        let result = group.orders.length + " " + group.dish.name;

        group.additions.forEach(addition => {
            if (addition) {
                result += " " + addition.name;
            }
        });

        if (group.notes) {
            result += " " + group.notes;
        }

        return result;
    }

    static renderOrder(order) {
        let result = order.dish.name;

        order.additions.forEach(addition => {
            if (addition) {
                result += " " + addition.name;
            }
        });

        if (order.notes) {
            result += " " + order.notes;
        }

        return result;
    }

    static formatPrice(price) {
        return "€" + price.toFixed(2);
    }

    static formatGroupPrice(grp) {
        return this.formatPrice(grp.price * grp.orders.length);
    }

    static renderOrdination(ordination) {
        return "Comanda delle " + beautifyTime(ordination.creationTime);
    }

    static ordinationDateSorter(o1, o2) {
        return o1.get('creationTime').localeCompare(o2.get('creationTime'));
    }
}