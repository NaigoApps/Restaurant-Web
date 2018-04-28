import {findByUuid, stringEquals, uuid} from "../../../utils/Utils";
import {beautifyTime} from "../../../components/widgets/inputs/DateInput";
import OrdinationsUtils from "../OrdinationsUtils";

const {fromJS, Map, List} = require('immutable');


export default class DiningTablesUtils {

    static sameOrder(o1, o2) {
        if (!o1 || !o2) {
            return false;
        }
        if (o1.get('dish') !== o2.get('dish')) {
            return false;
        }
        if (!stringEquals(o1.get('notes'), o2.get('notes'))) {
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
        table.get('ordinations').forEach(ordination => orders.push(...ordination.get('orders')));
        return orders;
    }

    static hasZeroPrices(table) {
        let result = false;
        let orders = this.findTableOrders(table);
        orders.forEach(order => result |= order.get('price') === 0);
        return result;
    }

    static findTableOpenedOrders(table) {
        let orders = List();
        table.get('ordinations').forEach(ordination => orders = orders.push(...ordination.get('orders')));
        table.get('bills').forEach(invoice => {
            orders = orders.filter(order => !invoice.get('orders').includes(order.get('uuid')));
        });
        return orders;
    }

    static findTableOpenedCoverCharges(table) {
        let ccs = table.get('coverCharges');
        table.get('bills').forEach(bill => {
            ccs -= bill.get('coverCharges');
        });
        return ccs;
    }

    static findSimilarTo(orders, order) {
        return orders.filter(o => DiningTablesUtils.sameOrder(o, order));
    }

    static implode(orders) {
        let result = List();
        orders.forEach(order => {
            result = DiningTablesUtils.mergeOrder(result, order);
        });
        return result;
    }

    static mergeOrder(groupsList, order) {
        let found = false;
        groupsList.forEach((grp, i) => {
            if (DiningTablesUtils.sameOrder(grp, order)) {
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

    static renderDiningTable(diningTable, tables, waiters) {
        let result = "";
        if (diningTable) {
            const table = findByUuid(tables, diningTable.get('table'));
            const waiter = findByUuid(waiters, diningTable.get('waiter'));
            result += table ? table.get('name') : "?";
            if (diningTable.get('openingTime')) {
                result += " (" + beautifyTime(diningTable.get('openingTime')) + ") ";
            } else {
                result += " (?) "
            }
            result += waiter ? waiter.get('name') : "?";
        }
        return result;
    }

    static getSelectedDiningTable(data) {
        return findByUuid(data.get('evening').get('diningTables'), data.get('selectedTable'));
    }

    static renderBill(bill, customers) {
        if (bill.get('customer')) {
            let customer = findByUuid(this.props.data.get('customers'), bill.get('customer'));
            return "Fattura n°" + bill.get('progressive') + " di " + DiningTablesUtils.renderCustomer(customer)
        } else {
            return "Ricevuta n°" + bill.get('progressive')
        }
    }

    static renderCustomer(customer) {
        return customer.get('name') + " " + customer.get('surname');
    }
}