import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";
import {iGet} from "../../../../utils/Utils";
import {DiningTablesEditorActionTypes} from "../DiningTablesEditorActions";

const {fromJS} = require('immutable');

export const DiningTablesClosingActionTypes = {
    SELECT_BILL: "SELECT_BILL",
    SELECT_BILL_PAGE: "SELECT_BILL_PAGE",
    DESELECT_BILL: "DESELECT_BILL",

    BEGIN_BILL_DELETION: "BEGIN_BILL_DELETION",
    ABORT_BILL_DELETION: "ABORT_BILL_DELETION",
    DELETE_BILL: "DELETE_BILL",

    BEGIN_CLOSING: "BEGIN_CLOSING",
    ABORT_CLOSING: "ABORT_CLOSING",
    CONFIRM_CLOSING: "CONFIRM_CLOSING",
    PRINT_BILL: "PRINT_BILL",

    BACKWARD: "BACKWARD",
    FORWARD: "FORWARD",

    SET_BILL_TYPE: "SET_BILL_TYPE",

    SPLIT_CHAR: "SPLIT_CHAR",
    SPLIT_CHANGE: "SPLIT_CHANGE",

    FINAL_TOTAL_CHAR: "FINAL_TOTAL_CHAR",
    FINAL_TOTAL_CHANGE: "FINAL_TOTAL_CHANGE",

    PERCENT_CHAR: "PERCENT_CHAR",
    PERCENT_CHANGE: "PERCENT_CHANGE",

    SET_QUICK: "SET_QUICK",

    SELECT_CUSTOMER: "SELECT_CUSTOMER",
    SELECT_CUSTOMER_PAGE: "SELECT_CUSTOMER_PAGE",

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

    beginClosing: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BEGIN_CLOSING),

    backward: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.BACKWARD),
    forward: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.FORWARD),

    createBill: (table, orders, total, coverCharges, customer) => {
        let params = {
            total: total,
            coverCharges: coverCharges
        };
        if (customer) {
            params.customer = customer;
        }
        asyncActionBuilder.put(DiningTablesClosingActionTypes.CONFIRM_CLOSING, 'dining-tables/' + table + "/bills", orders, params)
    },

    abortClosing: () => dispatcher.fireEnd(DiningTablesClosingActionTypes.ABORT_CLOSING),


    setBillType: (type) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_BILL_TYPE, type),

    splitChar: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SPLIT_CHAR, value),
    splitChange: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SPLIT_CHANGE, value),

    finalTotalChar: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.FINAL_TOTAL_CHAR, value),
    finalTotalChange: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.FINAL_TOTAL_CHANGE, value),

    setQuick: (value) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SET_QUICK, value),

    percentChar: (char) => dispatcher.fireEnd(DiningTablesClosingActionTypes.PERCENT_CHAR, char),
    percentChange: (text) => dispatcher.fireEnd(DiningTablesClosingActionTypes.PERCENT_CHANGE, text),

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

    selectInvoiceCustomer: (uuid) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SELECT_CUSTOMER, uuid),
    selectInvoiceCustomerPage: (page) => dispatcher.fireEnd(DiningTablesClosingActionTypes.SELECT_CUSTOMER_PAGE, page),

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