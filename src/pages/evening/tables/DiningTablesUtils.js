import {findByUuid} from "../../../utils/Utils";
import {beautifyTime} from "../../../components/widgets/inputs/DateInput";
const {fromJS, Map, List} = require('immutable');


export default class DiningTablesUtils {

    static sameOrder(o1, o2) {
        if (!o1 || !o2) {
            return false;
        }
        if (o1.get('dish') !== o2.get('dish')) {
            return false;
        }
        if (o1.get('notes') || o2.get('notes')) {
            return false;
        }
        if (o1.get('price') !== o2.get('price')) {
            return false;
        }
        let ok = true;
        ok &= o1.get('additions').every(addition => o2.get('additions').includes(addition));
        ok &= o2.get('additions').every(addition => o1.get('additions').includes(addition));
        return ok;
    }

    static findOrderInTable(table, sample) {
        let result = null;
        table.ordinations.forEach(ordination => {
            if (!result) {
                result = ordination.orders.find(order => DiningTablesUtils.sameOrder(sample, order));
            }
        });
        return result;
    }

    static findTableOrders(table) {
        let orders = [];
        table.ordinations.forEach(ordination => orders.push(...ordination.orders));
        return orders;
    }

    static findTableOpenedOrders(table) {
        let orders = [];
        table.get('ordinations').forEach(ordination => orders.push(...ordination.get('orders')));
        table.get('bills').forEach(invoice => {
            orders = orders.filter(order => !invoice.get('orders').includes(order.get('uuid')));
        });
        return orders;
    }

    static implode(orders) {
        let result = List();
        orders.forEach(order => {
            result = DiningTablesUtils.mergeOrder(result, order);
        });
        return result;
    }

    static mergeOrder(orders, order) {
        let found = false;
        orders.forEach((o, i) => {
            if (DiningTablesUtils.sameOrder(o.get('order'), order)) {
                o = o.set('quantity', o.get('quantity') + 1);
                o = o.set('price', o.get('price') + order.get('price'))
                orders = orders.set(i, o);
                found = true;
            }
        });
        if (!found) {
            orders = orders.push(Map({
                order: order,
                quantity: 1,
                price: order.get('price')
            }))
        }
        return orders;
    }

    static renderDiningTable(diningTable, tables, waiters) {
        if (diningTable) {
            const table = findByUuid(tables, diningTable.get('table'));
            const waiter = findByUuid(waiters, diningTable.get('waiter'));
            if (table && waiter) {
                return table.get('name') + " (" + beautifyTime(diningTable.get('openingTime')) + ") - " + waiter.get('name');
            }
        }
        return "?";
    }

    static getSelectedDiningTable(data) {
        return findByUuid(data.get('evening').get('diningTables'), data.get('selectedTable'));
    }
}