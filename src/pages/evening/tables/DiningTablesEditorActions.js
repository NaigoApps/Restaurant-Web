import requestBuilder from "../../../actions/RequestBuilder";
import {
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_ABORT_ENTITY_EDITING, ACT_BEGIN_DINING_TABLE_BILLS_EDITING,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_BEGIN_EDIT_ORDERS,
    ACT_BEGIN_ENTITY_EDITING, ACT_CLOSE_ALL_ORDERS, ACT_CLOSE_COVER_CHARGES,
    ACT_CLOSE_ORDERS,
    ACT_CREATE_BILL,
    ACT_DELETE_BILL,
    ACT_DELETE_ORDINATION,
    ACT_DESELECT_BILL, ACT_DINING_TABLE_CLOSING_BACKWARD, ACT_DINING_TABLE_CLOSING_FORWARD, ACT_OPEN_ALL_ORDERS,
    ACT_OPEN_COVER_CHARGES,
    ACT_OPEN_ORDERS,
    ACT_PRINT_PARTIAL_BILL,
    ACT_SELECT_BILL, ACT_SELECT_INVOICE_CUSTOMER, ACT_SET_BILL_TYPE, ACT_SET_FINAL_TOTAL, ACT_SET_PERCENT,
    ACT_SET_QUICK, ACT_SET_SPLIT,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_ENTITY
} from "../../../actions/ActionTypes";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {DINING_TABLE_TYPE, ORDINATION_TYPE} from "../../../stores/EntityEditorStore";
import {DINING_TABLE_COVER_CHARGES_EDITOR} from "../Topics";
import {
    ACT_DINING_TABLE_EDITOR_CCS_ABORT, ACT_DINING_TABLE_EDITOR_CCS_CHAR,
    ACT_DINING_TABLE_EDITOR_CCS_START
} from "./DiningTableActionTypes";

const {fromJS} = require('immutable');

class DiningTablesEditorActions {

    beginDiningTableEditing(table) {
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: DINING_TABLE_TYPE,
            entity: table
        }));
    }

    onStartCoverChargesEditing(){
        dispatcher.fireEnd(ACT_DINING_TABLE_EDITOR_CCS_START, null, [DINING_TABLE_COVER_CHARGES_EDITOR]);
    }

    onCoverChargesChar(char){
        dispatcher.fireEnd(ACT_DINING_TABLE_EDITOR_CCS_CHAR, char, [DINING_TABLE_COVER_CHARGES_EDITOR]);
    }

    onAbortCoverChargesEditing(){
        dispatcher.fireEnd(ACT_DINING_TABLE_EDITOR_CCS_ABORT, null, [DINING_TABLE_COVER_CHARGES_EDITOR]);
    }

    onCoverChargesConfirm(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/cover-charges',
            value.toString(),
            null,
            [DINING_TABLE_COVER_CHARGES_EDITOR]
        );
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

    abortDiningTableEditing() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, DINING_TABLE_TYPE);
    }

    updateDiningTableWaiter(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/waiter',
            value
        );
    }

    updateDiningTableTable(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/table',
            value
        )
    }

    deleteDiningTableOrdination(tUuid, oUuid) {
        requestBuilder.remove(ACT_DELETE_ORDINATION, 'dining-tables/' + tUuid + "/ordinations", oUuid)
            .then(() => dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDINATION_TYPE));
    }

    printPartialBill(uuid) {
        requestBuilder.post(ACT_PRINT_PARTIAL_BILL, 'dining-tables/print-partial-bill', uuid);
    }

    beginDiningTableClosing() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_CLOSING);
    }

    setBillType(type){
        dispatcher.fireEnd(ACT_SET_BILL_TYPE, type)
    }

    setSplit(value){
        dispatcher.fireEnd(ACT_SET_SPLIT, value)
    }

    setPercent(value){
        dispatcher.fireEnd(ACT_SET_PERCENT, value)
    }

    setQuick(value){
        dispatcher.fireEnd(ACT_SET_QUICK, value)
    }

    setFinalTotal(value){
        dispatcher.fireEnd(ACT_SET_FINAL_TOTAL, value);
    }

    closeOrders(order, quantity) {
        dispatcher.fireEnd(ACT_CLOSE_ORDERS, {order: order, quantity: quantity});
    }

    closeCoverCharges(quantity){
        dispatcher.fireEnd(ACT_CLOSE_COVER_CHARGES, quantity);
    }

    openCoverCharges(quantity){
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
        if(customer){
            params.customer = customer;
        }
        requestBuilder.put(ACT_CREATE_BILL, 'dining-tables/' + table + "/bills", orders, params)
            .then(result => {
                dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                    type: DINING_TABLE_TYPE,
                    entity: result
                }));
            });
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

    selectInvoiceCustomer(uuid){
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