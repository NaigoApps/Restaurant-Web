import requestBuilder from "../../../actions/RequestBuilder";
import {
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_BEGIN_EDIT_ORDERS,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CLOSE_ORDERS,
    ACT_CREATE_BILL,
    ACT_DELETE_BILL,
    ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_BILL,
    ACT_DESELECT_DINING_TABLE,
    ACT_OPEN_ORDERS,
    ACT_PRINT_PARTIAL_BILL,
    ACT_SELECT_BILL,
    ACT_SELECT_DINING_TABLE,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_ENTITY
} from "../../../actions/ActionTypes";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {DINING_TABLE_TYPE} from "../../../stores/EntityEditorStore";

const {fromJS} = require('immutable');

class DiningTablesEditorActions {

    beginDiningTableEditing(table) {
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: DINING_TABLE_TYPE,
            entity: table
        }));
    }

    beginDiningTableDataEditing() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_DATA_EDITING);
    }

    abortDiningTableDataEditing() {
        dispatcher.fireEnd(ACT_ABORT_DINING_TABLE_DATA_EDITING);
    }

    abortDiningTableEditing() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, DINING_TABLE_TYPE);
    }

    updateDiningTableCoverCharges(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/cover-charges',
            value.toString()
        ).then(table => this.refreshEditingDiningTable(table));
    }

    updateDiningTableWaiter(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/waiter',
            value
        ).then(table => this.refreshEditingDiningTable(table));
    }

    updateDiningTableTable(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/table',
            value
        ).then(table => this.refreshEditingDiningTable(table));
    }

    refreshEditingDiningTable(table){
        dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({type: DINING_TABLE_TYPE, updater: oldTable => table}));
    }

    deleteDiningTable(uuid) {
        requestBuilder.remove(ACT_DELETE_DINING_TABLE, 'dining-tables', uuid)
            .then(dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, DINING_TABLE_TYPE));
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

    createBill(table, orders) {
        requestBuilder.put(ACT_CREATE_BILL, 'dining-tables/' + table + "/bills", orders);
    }

    abortDiningTableClosing() {
        dispatcher.fireEnd(ACT_ABORT_DINING_TABLE_CLOSING);
    }

    selectBill(bill) {
        dispatcher.fireEnd(ACT_SELECT_BILL, bill);
    }

    deselectBill() {
        dispatcher.fireEnd(ACT_DESELECT_BILL);
    }

    printBill() {

    }

    deleteBill(tableUuid, billUuid) {
        requestBuilder.remove(ACT_DELETE_BILL, 'dining-tables/' + tableUuid + "/bills", billUuid);
    }
}

const diningTablesEditorActions = new DiningTablesEditorActions();

export default diningTablesEditorActions;