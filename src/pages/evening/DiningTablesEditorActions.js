import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_CLOSE_ORDERS,
    ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_DINING_TABLE,
    ACT_OPEN_ORDERS,
    ACT_PRINT_PARTIAL_BILL,
    ACT_SELECT_DINING_TABLE,
    ACT_UPDATE_DINING_TABLE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class DiningTablesEditorActions {

    updateDiningTableCoverCharges(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/cover-charges',
            value.toString()
        );
    }

    updateDiningTableWaiter(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/waiter',
            value
        );
    }

    updateDiningTableTable(uuid, value) {
        requestBuilder.put(ACT_UPDATE_DINING_TABLE, 'dining-tables/' + uuid + '/table', value);
    }

    selectDiningTable(table) {
        dispatcher.fireEnd(ACT_SELECT_DINING_TABLE, table);
    }

    deselectDiningTable() {
        dispatcher.fireEnd(ACT_DESELECT_DINING_TABLE);
    }

    deleteDiningTable(uuid) {
        requestBuilder.remove(ACT_DELETE_DINING_TABLE, 'dining-tables', uuid);
    }

    printPartialBill(uuid) {
        requestBuilder.post(ACT_PRINT_PARTIAL_BILL, 'dining-tables/print-partial-bill', uuid);
    }

    beginDiningTableClosing() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_CLOSING);
    }

    closeOrders(order, quantity) {
        dispatcher.fireEnd(ACT_CLOSE_ORDERS, {order: order, quantity: quantity})
    }

    openOrders(order, quantity) {
        dispatcher.fireEnd(ACT_OPEN_ORDERS, {order: order, quantity: quantity})
    }

    abortDiningTableClosing() {
        dispatcher.fireEnd(ACT_ABORT_DINING_TABLE_CLOSING);
    }
}

const diningTablesEditorActions = new DiningTablesEditorActions();

export default diningTablesEditorActions;