import {findByUuid, stringEquals, uuid} from "../../utils/Utils";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {beautifyTime, formatDate} from "../../components/widgets/inputs/DateInput";
import StoresUtils from "../StoresUtils";
const {fromJS, Map, OrderedMap, List} = require('immutable');

export default class OrdinationsUtils {

    static phaseComparator(o1, o2, phases){
        let p1 = findByUuid(phases, o1.get('phase')).get('priority');
        let p2 = findByUuid(phases, o2.get('phase')).get('priority');
        return p1 - p2;
    }

    static makePhaseMap(orders, phases) {
        let result = new OrderedMap();
        if(orders) {
            orders = orders.sort((o1, o2) => OrdinationsUtils.phaseComparator(o1, o2, phases));
            orders.forEach(order => {
                let phase = order.get('phase');
                if (!result.get(phase)) {
                    result = result.set(order.get('phase'), List());
                }
                result = result.updateIn([order.get('phase')], phaseOrders => phaseOrders.push(order));
            });
        }
        return result;
    }

    static implode(orders) {
        let result = List();
        orders.forEach(order => {
            result = OrdinationsUtils.mergeOrder(result, order);
        });
        return result;
    }

    static sortByDish(orders, dishes, additions) {
        return orders.sort((o1, o2) => {
            let d1 = findByUuid(dishes, o1.get('dish'));
            let d2 = findByUuid(dishes, o2.get('dish'));
            if (d1 && d2) {
                let cmp = d1.get('name').localeCompare(d2.get('name'));
                if (cmp === 0) {
                    if (o1.get('additions').size > o2.get('additions').size) {
                        return -1;
                    } else if (o2.get('additions').size > o1.get('additions').size) {
                        return 1;
                    }
                    for (let i = 0; i < o1.get('additions').size; i++) {
                        let a1 = findByUuid(additions, o1.get('additions').get(i));
                        let a2 = findByUuid(additions, o2.get('additions').get(i));
                        if (a1 && a2) {
                            if (a1.get('name').localeCompare(a2.get('name').name) < 0) {
                                return -1;
                            }
                            if (a1.get('name').name.localeCompare(a2.get('name').name) > 0) {
                                return 1;
                            }
                        }
                    }
                    return 0;
                }
                return cmp;
            }
            return o1.get('dish').localeCompare(o2.get('dish'));
        });
    }



    static mergeOrder(groupsList, order) {
        let found = false;
        groupsList.forEach((grp, i) => {
            if (OrdinationsUtils.sameOrder(grp, order)) {
                let values = grp.get('orders');
                groupsList = groupsList.set(i, grp.set('orders', values.push(order)));
                found = true;
            }
        });
        if (!found) {
            groupsList = groupsList.push(Map({
                groupId: groupsList.size,
                dish: order.get('dish'),
                phase: order.get('phase'),
                price: order.get('price'),
                additions: order.get('additions'),
                notes: order.get('notes'),
                orders: List([order])
            }))
        }
        return groupsList;
    }

    static sameOrder(o1, o2) {
        return DiningTablesUtils.sameOrder(o1, o2) && o1.get('phase') === o2.get('phase')
    }

    static countOrders(orders, order){
        let result = 0;
        orders.forEach(o => result += OrdinationsUtils.sameOrder(o, order) ? 1 : 0);
        return result;
    }

    static buildOrder(dish, phase, price, ordination) {
        return fromJS({
            dish: dish,
            phase: phase,
            price: price,
            additions: [],
            notes:''
        });
    }

    static total(orders) {
        let result = 0;
        orders.forEach(order => {
            result += order.get('price');
        });
        return result;
    }

    static renderOrder(order, dishes, additions) {
        let result = dishes.find(d => d.get('uuid') === order.get('dish')).get('name');

        order.get('additions').forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.get('name')
            }
        });

        if(order.get('notes')){
            result += " " + order.get('notes');
        }

        return result;
    }

    static renderImplodedOrder(group, dishes, additions) {
        let dish = findByUuid(dishes, group.get('dish'));
        let result = group.get('orders').size + " " + (dish ? dish.get('name') : "?");

        group.get('additions').forEach(uuid => {
            let addition = findByUuid(additions, uuid);
            if (addition) {
                result += " " + addition.get('name');
            }
        });

        if(group.get('notes')){
            result += " " + group.get('notes');
        }

        return result;
    }

    static formatPrice(price) {
        return price.toFixed(2) + "€";
    }

    static formatGroupPrice(grp) {
        return this.formatPrice(grp.get('price') * grp.get('orders').size);
    }

    static renderOrdination(ordination){
        return "Comanda delle " + beautifyTime(ordination.get('creationTime'));
    }

    static ordinationDateSorter(o1, o2){
        return o1.get('creationTime').localeCompare(o2.get('creationTime'));
    }
}