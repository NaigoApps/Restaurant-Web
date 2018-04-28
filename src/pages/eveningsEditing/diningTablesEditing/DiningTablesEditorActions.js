import requestBuilder from "../../../actions/RequestBuilder";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {OrdinationEditorActionTypes} from "./ordinationsEditing/OrdinationsEditorActions";

const {fromJS} = require('immutable');

export const DiningTablesEditorActionTypes = {
    BEGIN_DINING_TABLE_CREATION: "BEGIN_DINING_TABLE_CREATION",
    CREATE_DINING_TABLE: "CREATE_DINING_TABLE",
    ABORT_DINING_TABLE_CREATION: "ABORT_DINING_TABLE_CREATION",

    SELECT_DINING_TABLE: "SELECT_DINING_TABLE",
    SELECT_DINING_TABLE_PAGE: "SELECT_DINING_TABLE_PAGE",
    DESELECT_DINING_TABLE: "DESELECT_DINING_TABLE",

    BEGIN_DINING_TABLE_DELETION: "BEGIN_DINING_TABLE_DELETION",
    ABORT_DINING_TABLE_DELETION: "ABORT_DINING_TABLE_DELETION",
    DELETE_DINING_TABLE: "DELETE_DINING_TABLE",

    BEGIN_DATA_EDITING: "BEGIN_DATA_EDITING",
    BEGIN_ORDINATIONS_EDITING: "BEGIN_ORDINATIONS_EDITING",
    BEGIN_BILLS_EDITING: "BEGIN_BILLS_EDITING",

    CONFIRM_CREATOR_CCS: "CONFIRM_CREATOR_CCS",
    CONFIRM_CCS: "CONFIRM_CCS",

    CONFIRM_WAITER: "CONFIRM_WAITER",
    CONFIRM_CREATOR_WAITER: "CONFIRM_CREATOR_WAITER",

    CONFIRM_TABLE: "CONFIRM_TABLE",
    CONFIRM_CREATOR_TABLE: "CONFIRM_CREATOR_TABLE",

    PRINT_PARTIAL_BILL: "PRINT_PARTIAL_BILL",

    MERGE_DINING_TABLE: "MERGE_DINING_TABLE",
};

export const DiningTablesEditorActions = {

    select: (table) => dispatcher.fireEnd(DiningTablesEditorActionTypes.SELECT_DINING_TABLE, table),
    selectPage: (page) => dispatcher.fireEnd(DiningTablesEditorActionTypes.SELECT_DINING_TABLE_PAGE),
    deselect: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.DESELECT_DINING_TABLE),


    beginDeletion: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_DELETION),
    abortDeletion: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.ABORT_DINING_TABLE_DELETION),

    deleteDiningTable: (tabUuid) => requestBuilder.remove(
        DiningTablesEditorActionTypes.DELETE_DINING_TABLE,
        'evenings/diningTables/',
        tabUuid
    ),

    //Cover charges
    confirmCoverCharges: (uuid, value) => requestBuilder.put(
        DiningTablesEditorActionTypes.CONFIRM_CCS,
        'dining-tables/' + uuid + '/cover-charges',
        value.toString()
    ),

    //Waiter
    confirmWaiter: (uuid, waiter) => requestBuilder.put(
        DiningTablesEditorActionTypes.CONFIRM_WAITER,
        'dining-tables/' + uuid + '/waiter',
        waiter
    ),

    //Table
    confirmTable: (uuid, table) => requestBuilder.put(
        DiningTablesEditorActionTypes.CONFIRM_TABLE,
        'dining-tables/' + uuid + '/table',
        table
    ),

    //Editors
    beginDataEditing: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.BEGIN_DATA_EDITING),
    beginOrdinationsEditing: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.BEGIN_ORDINATIONS_EDITING),
    beginBillsEditing: () => dispatcher.fireEnd(DiningTablesEditorActionTypes.BEGIN_BILLS_EDITING),

    //MERGE
    confirmMerge: (src, dest) => requestBuilder.post(
        DiningTablesEditorActionTypes.MERGE_DINING_TABLE,
        'evenings/tables/merge/' + src,
        dest
    ),


    //BILLS


    printPartialBill : (uuid) => requestBuilder.post(
        DiningTablesEditorActionTypes.PRINT_PARTIAL_BILL,
        'dining-tables/print-partial-bill',
        uuid),

};