import requestBuilder from "../../../actions/RequestBuilder";
import {
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_DINING_TABLE_BILLS_EDITING,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_BEGIN_EDIT_ORDERS,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CLOSE_ALL_ORDERS,
    ACT_CLOSE_COVER_CHARGES,
    ACT_CLOSE_ORDERS,
    ACT_DELETE_BILL,
    ACT_DESELECT_BILL,
    ACT_DESELECT_DINING_TABLE,
    ACT_DINING_TABLE_CLOSING_BACKWARD,
    ACT_DINING_TABLE_CLOSING_FORWARD,
    ACT_OPEN_ALL_ORDERS,
    ACT_OPEN_COVER_CHARGES,
    ACT_OPEN_ORDERS,
    ACT_PRINT_PARTIAL_BILL,
    ACT_SELECT_BILL,
    ACT_SELECT_DINING_TABLE,
    ACT_SELECT_INVOICE_CUSTOMER,
    ACT_SET_BILL_TYPE,
    ACT_SET_FINAL_TOTAL,
    ACT_SET_PERCENT,
    ACT_SET_QUICK,
    ACT_SET_SPLIT,
    ACT_UPDATE_ENTITY
} from "../../../actions/ActionTypes";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {Actions} from "../diningTablesEditing/DiningTablesEditingActions";

const {fromJS} = require('immutable');

class DiningTablesEditorActions {

    beginDiningTableEditing(table) {
        dispatcher.fireEnd(Actions.SELECT_DINING_TABLE, table);
    }

    abortDiningTableEditing() {
        dispatcher.fireEnd(Actions.DESELECT_DINING_TABLE);
    }

    //Cover charges

    onStartCoverChargesEditing() {
        dispatcher.fireEnd(Actions.BEGIN_CCS_EDITING);
    }

    onCoverChargesChange(text) {
        dispatcher.fireEnd(Actions.CCS_CHANGE, text);
    }

    onCoverChargesChar(char) {
        dispatcher.fireEnd(Actions.CCS_CHAR, char);
    }

    onAbortCoverChargesEditing() {
        dispatcher.fireEnd(Actions.ABORT_CCS);
    }

    onCoverChargesConfirm(uuid, value) {
        requestBuilder.put(
            Actions.CONFIRM_CCS,
            'dining-tables/' + uuid + '/cover-charges',
            value.toString()
        );
    }

    //Waiter

    onStartWaiterEditing() {
        dispatcher.fireEnd(Actions.BEGIN_WAITER_EDITING);
    }

    onSelectWaiterPage(page) {
        dispatcher.fireEnd(Actions.SELECT_WAITER_PAGE, page);
    }

    onSelectWaiter(waiter) {
        dispatcher.fireEnd(Actions.SELECT_WAITER, waiter);
    }

    onConfirmWaiter(uuid, waiter) {
        requestBuilder.put(
            Actions.CONFIRM_WAITER,
            'dining-tables/' + uuid + '/waiter',
            waiter
        );
    }

    onAbortWaiter() {
        dispatcher.fireEnd(Actions.ABORT_WAITER);
    }

    //Table

    onStartTableEditing() {
        dispatcher.fireEnd(Actions.BEGIN_TABLE_EDITING);
    }

    onSelectTablePage(page) {
        dispatcher.fireEnd(Actions.SELECT_TABLE_PAGE, page);
    }

    onSelectTable(table) {
        dispatcher.fireEnd(Actions.SELECT_TABLE, table);
    }

    onAbortTable() {
        dispatcher.fireEnd(Actions.ABORT_TABLE);
    }

    onConfirmTable(uuid, table) {
        requestBuilder.put(
            Actions.CONFIRM_TABLE,
            'dining-tables/' + uuid + '/table',
            table
        )
    }






    beginDiningTableDataEditing() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_DATA_EDITING);
    }

    beginDiningTableBillsEditing() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_BILLS_EDITING);
    }

    abortDiningTableDataEditing() {
        dispatcher.fireEnd(ACT_ABORT_DINING_TABLE_DATA_EDITING);
    }

    deleteDiningTableOrdination(tUuid, oUuid) {
        //FIXME
        // requestBuilder.remove(ACT_DELETE_ORDINATION, 'dining-tables/' + tUuid + "/ordinations", oUuid)
        //     .then(() => dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDINATION_TYPE));
    }

    printPartialBill(uuid) {
        requestBuilder.post(ACT_PRINT_PARTIAL_BILL, 'dining-tables/print-partial-bill', uuid);
    }

    beginDiningTableClosing() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_CLOSING);
    }

    setBillType(type) {
        dispatcher.fireEnd(ACT_SET_BILL_TYPE, type)
    }

    setSplit(value) {
        dispatcher.fireEnd(ACT_SET_SPLIT, value)
    }

    setPercent(value) {
        dispatcher.fireEnd(ACT_SET_PERCENT, value)
    }

    setQuick(value) {
        dispatcher.fireEnd(ACT_SET_QUICK, value)
    }

    setFinalTotal(value) {
        dispatcher.fireEnd(ACT_SET_FINAL_TOTAL, value);
    }

    closeOrders(order, quantity) {
        dispatcher.fireEnd(ACT_CLOSE_ORDERS, {order: order, quantity: quantity});
    }

    closeCoverCharges(quantity) {
        dispatcher.fireEnd(ACT_CLOSE_COVER_CHARGES, quantity);
    }

    openCoverCharges(quantity) {
        dispatcher.fireEnd(ACT_OPEN_COVER_CHARGES, quantity);
    }

    closeAllOrders() {
        dispatcher.fireEnd(ACT_CLOSE_ALL_ORDERS);
    }

    openOrders(order, quantity) {
        dispatcher.fireEnd(ACT_OPEN_ORDERS, {order: order, quantity: quantity});
    }

    openAllOrders() {
        dispatcher.fireEnd(ACT_OPEN_ALL_ORDERS);
    }

    createBill(table, orders, total, coverCharges, customer) {
        let params = {
            total: total,
            coverCharges: coverCharges
        };
        if (customer) {
            params.customer = customer;
        }
        //FIXME
        // requestBuilder.put(ACT_CREATE_BILL, 'dining-tables/' + table + "/bills", orders, params)
        //     .then(result => {
        //         dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
        //             type: DINING_TABLE_TYPE,
        //             entity: result
        //         }));
        //     });
    }

    abortDiningTableClosing() {
        dispatcher.fireEnd(ACT_ABORT_DINING_TABLE_CLOSING);
    }

    closingWizardBackward() {
        dispatcher.fireEnd(ACT_DINING_TABLE_CLOSING_BACKWARD);
    }

    closingWizardForward(pages) {
        dispatcher.fireEnd(ACT_DINING_TABLE_CLOSING_FORWARD, pages);
    }

    selectInvoiceCustomer(uuid) {
        dispatcher.fireEnd(ACT_SELECT_INVOICE_CUSTOMER, uuid);
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