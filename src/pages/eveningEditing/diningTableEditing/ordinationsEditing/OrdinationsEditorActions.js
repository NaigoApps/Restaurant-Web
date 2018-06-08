import {ACT_UPDATE_ENTITY} from "../../../../actions/ActionTypes";
import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";

const {fromJS, List} = require('immutable');

export const OrdinationEditorActionTypes = {
    BEGIN_ORDINATION_EDITING: "BEGIN_ORDINATION_EDITING",
    ABORT_ORDINATION_EDITING: "ABORT_ORDINATION_EDITING",
    UPDATE_ORDERS: "UPDATE_ORDERS",
    SELECT_ORDINATION_PAGE: "SELECT_ORDINATION_PAGE",
    ABORT_ORDERS_EDITING: "ABORT_ORDERS_EDITING",
    PRINT_ORDINATION: "PRINT_ORDINATION",
    ABORT_ORDINATION: "ABORT_ORDINATION",

    BEGIN_ORDINATION_DELETION: "BEGIN_ORDINATION_DELETION",
    ABORT_ORDINATION_DELETION: "ABORT_ORDINATION_DELETION",
    DELETE_ORDINATION: "DELETE_ORDINATION",
};

export const OrdinationsEditorActions = {

    abortOrdinationEditing: () => dispatcher.fireEnd(OrdinationEditorActionTypes.ABORT_ORDINATION_EDITING),

    beginOrdinationEditing: (uuid) => dispatcher.fireEnd(OrdinationEditorActionTypes.BEGIN_ORDINATION_EDITING, uuid),

    selectOrdinationPage: (page) => dispatcher.fireEnd(OrdinationEditorActionTypes.SELECT_ORDINATION_PAGE, page),

    onConfirmOrders: (tableUuid, ordinationUuid, orders) => asyncActionBuilder.put(
        OrdinationEditorActionTypes.UPDATE_ORDERS,
        'dining-tables/' + ordinationUuid + '/orders', orders),

    onAbortOrders: () => dispatcher.fireEnd(OrdinationEditorActionTypes.ABORT_ORDERS_EDITING),

    printOrdination: (uuid) => asyncActionBuilder.post(
        OrdinationEditorActionTypes.PRINT_ORDINATION,
        'printers/print',
        uuid
    ),

    abortOrdination: (uuid) => asyncActionBuilder.put(
        OrdinationEditorActionTypes.ABORT_ORDINATION,
        'ordinations/' + uuid + "/abort"
    ),

    beginOrdinationDeletion: () => dispatcher.fireEnd(OrdinationEditorActionTypes.BEGIN_ORDINATION_DELETION),
    abortOrdinationDeletion: () => dispatcher.fireEnd(OrdinationEditorActionTypes.ABORT_ORDINATION_DELETION),

    deleteOrdination: (tabUuid, ordUuid) => asyncActionBuilder.remove(
        OrdinationEditorActionTypes.DELETE_ORDINATION,
        'dining-tables/' + tabUuid + "/ordinations",
        ordUuid
    )
};