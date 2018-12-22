import {findByUuid, stringEquals} from "../../../utils/Utils";
import {formatTime} from "../../../components/widgets/inputs/DateInput";
import RenderingData from "../../../components/widgets/inputs/RenderingData";
import DiningTableStatus from "../../../model/DiningTableStatus";

export default class DiningTablesUtils {

    static sameOrder(o1, o2) {
        if (!o1 || !o2) {
            return false;
        }
        if (o1.dish.uuid !== o2.dish.uuid) {
            return false;
        }
        if (!stringEquals(o1.notes, o2.notes)) {
            return false;
        }
        if (o1.price !== o2.price) {
            return false;
        }
        let ok = true;
        ok &= o1.additions.every(addition => o2.additions.includes(addition));
        ok &= o2.additions.every(addition => o1.additions.includes(addition));
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

    static hasZeroPrices(table) {
        let result = false;
        let orders = table.listOrders();
        orders.forEach(order => result |= order.price === 0);
        return result;
    }

    static ordersTotal(orders) {
        let sum = 0;
        orders.forEach(order => sum += order.price);
        return sum;
    }

    static tableOrdersTotal(table) {
        let sum = 0;
        table.listOrders().forEach(order => sum += order.price);
        return sum;
    }

    static tableBillsTotal(table) {
        let sum = 0;
        table.bills.forEach(bill => sum += bill.total);
        return sum;
    }

    static findTableOpenedOrders(table, editingBill) {
        let orders = table.listOrders();
        table.bills
            .filter(bill => !editingBill || bill.uuid !== editingBill.uuid)
            .forEach(bill => {
                orders = orders.filter(order => !bill.orders.includes(order));
            });
        if (editingBill) {
            orders = orders.filter(order => !editingBill.orders.includes(order))
        }
        return orders;
    }

    static findTableOpenedCoverCharges(table) {
        let ccs = table.coverCharges;
        table.bills
            .forEach(bill => {
                ccs -= bill.coverCharges;
            });
        return ccs;
    }

    static isTableAlmostCloseable(table) {
        return DiningTablesUtils.findTableOpenedCoverCharges(table) === 0 &&
            DiningTablesUtils.findTableOpenedOrders(table).length === 0;
    }

    static findSimilarTo(orders, order) {
        return orders.filter(o => DiningTablesUtils.sameOrder(o, order));
    }

    static implode(orders) {
        let result = [];
        orders.forEach(order => DiningTablesUtils.mergeOrder(result, order));
        return result;
    }

    static mergeOrder(groupsList, order) {
        let group = groupsList.find(grp => DiningTablesUtils.sameOrder(grp, order));
        if(!group){
            group = {
                groupId: groupsList.length,
                dish: order.dish,
                phase: order.phase,
                price: order.price,
                additions: order.additions,
                notes: order.notes,
                orders: []
            };
            groupsList.push(group);
        }
        group.orders.push(order);
    }

    static renderDiningTable(dTable) {
        let txt = "Tavolo ";
        let bg = "secondary";
        if (dTable) {
            const table = dTable.table;
            const waiter = dTable.waiter;
            txt += table ? table.name : "?";
            if (dTable.openingTime) {
                txt += " (" + formatTime(dTable.openingTime) + ") ";
            } else {
                txt += " (?) "
            }
            txt += waiter ? waiter.name : "?";
            switch (dTable.status) {
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
        }
        return new RenderingData(txt, bg)
    }

    static getSelectedDiningTable(data) {
        return findByUuid(data.get('evening').get('diningTables'), data.get('selectedTable'));
    }

    static renderBill(bill) {
        if (!bill.printTime) {
            return "Conto generico n°" + bill.progressive;
        }
        if (bill.customer) {
            return "Fattura n°" + bill.progressive + " di " + DiningTablesUtils.renderCustomer(bill.customer).text;
        } else {
            return "Ricevuta n°" + bill.progressive
        }
    }

    static renderCustomer(customer) {
        return new RenderingData(customer.name + " " + customer.surname);
    }
}