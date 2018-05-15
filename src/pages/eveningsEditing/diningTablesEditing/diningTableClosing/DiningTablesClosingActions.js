import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";

const {fromJS} = require('immutable');

export const DiningTablesClosingActionTypes = {
    SELECT_BILL: "SELECT_BILL",
    SELECT_BILL_PAGE: "SELECT_BILL_PAGE",
    DESELECT_BILL: "DESELECT_BILL",

    BEGIN_BILL_EDITING: "BEGIN_BILL_EDITING",

    BEGIN_BILL_DELETION: "BEGIN_BILL_DELETION",
    ABORT_BILL_DELETION: "ABORT_BILL_DELETION",
    DELETE_BILL: "DELETE_BILL",

    BEGIN_BILL_CREATION: "BEGIN_BILL_CREATION",
    ABORT_CLOSING: "ABORT_CLOSING",
    CONFIRM_CLOSING: "CONFIRM_CLOSING",

    BEGIN_BILL_PRINTING: "BEGIN_BILL_PRINTING",
    SELECT_CUSTOMER: "SELECT_CUSTOMER",
    SELECT_CUSTOMER_PAGE: "SELECT_CUSTOMER_PAGE",
    ABORT_BILL_PRINTING: "ABORT_BILL_PRINTING",
    PRINT_BILL: "PRINT_BILL",

    BACKWARD: "BACKWARD",
    FORWARD: "FORWARD",

    SET_BILL_TYPE: "SET_BILL_TYPE",

    SET_SPLIT: "SET_SPLIT",
    SET_FINAL_TOTAL: "SET_FINAL_TOTAL",
    SET_PERCENT: "SET_PERCENT",

    SET_QUICK: "SET_QUICK",

    CLOSE_COVER_CHARGES: "CLOSE_COVER_CHARGES",
    OPEN_COVER_CHARGES: "OPEN_COVER_CHARGES",
    CLOSE_ALL_COVER_CHARGES: "CLOSE_ALL_COVER_CHARGES",
    OPEN_ALL_COVER_CHARGES: "OPEN_ALL_COVER_CHARGES",

    CLOSE_ORDERS: "CLOSE_ORDERS",
    OPEN_ORDERS: "OPEN_ORDERS",
    CLOSE_ALL_ORDERS: "CLOSE_ALL_ORDERS",
    OPEN_ALL_ORDERS: "OPEN_ALL_ORDERS",
};

export const DiningTablesClosingActions = {

    selectBillPage: (page) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SELECT_BILL_PAGE, page),
    selectBill: (bill) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SELECT_BILL, bill),
    deselectBill: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.DESELECT_BILL),

    beginClosing: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BEGIN_BILL_CREATION),
    beginBillEditing: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BEGIN_BILL_EDITING),

    backward: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BACKWARD),
    forward: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.FORWARD),

    createBill: (table, bill) => {
        asyncActionBuilder.put(DiningTablesClosingActionTypes.CONFIRM_CLOSING, 'dining-tables/' + table + "/bills", bill)
    },

    updateBill: (table, bill) => {
        //FIXME Va bene CONFIRM_CLOSING, ma semmai cambiare
        asyncActionBuilder.put(DiningTablesClosingActionTypes.CONFIRM_CLOSING, 'dining-tables/' + table + "/bills/" + bill.get('uuid'), bill)
    },

    abortClosing: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.ABORT_CLOSING),


    setBillType: (type) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_BILL_TYPE, type),

    setSplit: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_SPLIT, value),
    setFinalTotal: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_FINAL_TOTAL, value),
    setQuick: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_QUICK, value),
    setPercent: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_PERCENT, value),

    closeCoverCharges: (quantity) => dispatcher.fireEnd(DiningTablesClosingActionTypes.CLOSE_COVER_CHARGES, quantity),
    openCoverCharges: (quantity) => dispatcher.fireEnd(DiningTablesClosingActionTypes.OPEN_COVER_CHARGES, quantity),
    closeAllCoverCharges: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.CLOSE_ALL_COVER_CHARGES),
    openAllCoverCharges: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.OPEN_ALL_COVER_CHARGES),

    closeOrders: (order, quantity) => dispatcher.fireEnd(DiningTablesClosingActionTypes.CLOSE_ORDERS, {
        order: order,
        quantity: quantity
    }),
    openOrders: (order, quantity) => dispatcher.fireEnd(DiningTablesClosingActionTypes.OPEN_ORDERS, {
        order: order,
        quantity: quantity
    }),
    closeAllOrders: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.CLOSE_ALL_ORDERS),
    openAllOrders: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.OPEN_ALL_ORDERS),

    beginBillPrinting : () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BEGIN_BILL_PRINTING),
    selectInvoiceCustomer: (uuid) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SELECT_CUSTOMER, uuid),
    selectInvoiceCustomerPage: (page) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SELECT_CUSTOMER_PAGE, page),
    abortBillPrinting : () => dispatcher.fireEnd(DiningTablesClosingActionTypes.ABORT_BILL_PRINTING),
    printBill : (uuid) => asyncActionBuilder.post(
        DiningTablesClosingActionTypes.PRINT_BILL,
        'dining-tables/print-bill',
        uuid),

    beginBillDeletion : () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BEGIN_BILL_DELETION),
    abortBillDeletion : () => dispatcher.fireEnd(DiningTablesClosingActionTypes.ABORT_BILL_DELETION),

    deleteBill: (tableUuid, billUuid) => asyncActionBuilder.remove(
        DiningTablesClosingActionTypes.DELETE_BILL,
        'dining-tables/' + tableUuid + "/bills",
        billUuid),
};