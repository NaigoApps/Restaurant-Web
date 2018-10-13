import {findByUuid, iGet, stringEquals, uuid} from "../../../utils/Utils";
import {beautifyTime, formatTime} from "../../../components/widgets/inputs/DateInput";
import RenderingData from "../../../components/widgets/inputs/RenderingData";
import DiningTableStatus from "../../../model/DiningTableStatus";

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
        let orders = List();
        table.get('ordinations').forEach(ordination => orders = orders.push(...ordination.get('orders')));
        return orders;
    }

    static hasZeroPrices(table) {
        let result = false;
        let orders = this.findTableOrders(table);
        orders.forEach(order => result |= order.get('price') === 0);
        return result;
    }

    static ordersTotal(orders){
        let sum = 0;
        orders.forEach(order => sum += order.get('price'));
        return sum;
    }

    static tableOrdersTotal(table){
        let sum = 0;
        table.get('ordinations').forEach(ordination => {
            ordination.get('orders').forEach(order => sum += order.get('price'))
        });
        return sum;
    }

    static tableBillsTotal(table){
        let sum = 0;
        table.get('bills').forEach(bill => sum += bill.get('total'));
        return sum;
    }

    static findTableOpenedOrders(table, editingBill) {
        let orders = List();
        table.get('ordinations').forEach(ordination => orders = orders.push(...ordination.get('orders')));
        table.get('bills')
            .filter(bill => !editingBill || bill.get('uuid') !== editingBill.get('uuid'))
            .forEach(bill => {
            orders = orders.filter(order => !bill.get('orders').includes(order.get('uuid')));
        });
        if(editingBill){
            orders = orders.filter(order => !editingBill.get('orders').includes(order.get('uuid')))
        }
        return orders;
    }

    static findTableOpenedCoverCharges(table, editingBill) {
        let ccs = table.get('coverCharges');
        table.get('bills')
            .filter(bill => !editingBill || bill.get('uuid') !== editingBill.get('uuid'))
            .forEach(bill => {
            ccs -= bill.get('coverCharges');
        });
        if(editingBill){
            ccs -= editingBill.get('coverCharges');
        }
        return ccs;
    }

    static isTableCloseable(table){
        let billsOk = true;
        table.get('bills').forEach(bill => billsOk &= !DiningTablesUtils.isGenericBill(bill));
        return billsOk && DiningTablesUtils.isTableAlmostCloseable(table);
    }

    static isGenericBill(bill){
        return !bill.get('printTime');
    }
    static isInvoiceBill(bill){
        return bill.get('printTime') && bill.get('customer');
    }
    static isReceiptBill(bill){
        return bill.get('printTime') && !bill.get('customer');
    }

    static isTableAlmostCloseable(table){
        return DiningTablesUtils.findTableOpenedCoverCharges(table) === 0 &&
            DiningTablesUtils.findTableOpenedOrders(table).size === 0;
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

    static renderDiningTable(table) {
        let txt = "Tavolo ";
        if (table) {
            const table = table.table;
            const waiter = table.waiter;
            txt += table ? table.name : "?";
            if (table.openingTime) {
                txt += " (" + formatTime(table.openingTime) + ") ";
            } else {
                txt += " (?) "
            }
            txt += waiter ? waiter.name : "?";
        }
        let bg;
        switch (table.status){
            case DiningTableStatus.OPEN:
                bg = "danger";
                break;
            case DiningTableStatus.CLOSING:
                bg = "warning";
                break;
            default:
                bg = "secondary";
                break;
        }
        return new RenderingData(txt, null, bg)
    }

    static getSelectedDiningTable(data) {
        return findByUuid(data.get('evening').get('diningTables'), data.get('selectedTable'));
    }

    static renderBill(bill, customers) {
        if(!bill.printTime){
            return "Conto generico n°" + bill.progressive;
        }
        if (bill.customer) {
            let customer = findByUuid(customers, bill.customer);
            return "Fattura n°" + bill.progressive + " di " + DiningTablesUtils.renderCustomer(customer);
        } else {
            return "Ricevuta n°" + bill.progressive
        }
    }

    static renderCustomer(customer) {
        return customer.name + " " + customer.surname;
    }
}