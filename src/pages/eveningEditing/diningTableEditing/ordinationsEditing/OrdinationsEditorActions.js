import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";
import {OrdinationCreatorActionTypes} from "./OrdinationsCreatorActions";

export const OrdinationEditorActionTypes = {};

export default class OrdinationsEditorActions {
    static BEGIN_ORDINATION_CREATION = "BEGIN_ORDINATION_CREATION";
    static ABORT_ORDINATION_CREATION = "ABORT_ORDINATION_CREATION";
    static CREATE_ORDINATION = "CREATE_ORDINATION";
    static BEGIN_ORDINATION_EDITING = "BEGIN_ORDINATION_EDITING";
    static ABORT_ORDINATION_EDITING = "ABORT_ORDINATION_EDITING";
    static UPDATE_ORDERS = "UPDATE_ORDERS";
    static SELECT_ORDINATION_PAGE = "SELECT_ORDINATION_PAGE";
    static ABORT_ORDERS_EDITING = "ABORT_ORDERS_EDITING";
    static PRINT_ORDINATION = "PRINT_ORDINATION";
    static ABORT_ORDINATION = "ABORT_ORDINATION";

    static BEGIN_ORDINATION_DELETION = "BEGIN_ORDINATION_DELETION";
    static ABORT_ORDINATION_DELETION = "ABORT_ORDINATION_DELETION";
    static DELETE_ORDINATION = "DELETE_ORDINATION";


    static beginOrdinationCreation() {
        dispatcher.fireEnd(OrdinationCreatorActionTypes.BEGIN_ORDINATION_CREATION);
    }

    static abortOrdinationCreation() {
        dispatcher.fireEnd(OrdinationCreatorActionTypes.ABORT_ORDINATION_CREATION);
    }

    static onConfirmOrders(table, ordination, orders) {
        asyncActionBuilder.post(
            OrdinationCreatorActionTypes.CREATE_ORDINATION,
            'dining-tables/' + table + '/ordinations', orders);
    }

    static onAbortOrders() {
        dispatcher.fireEnd(OrdinationCreatorActionTypes.ABORT_ORDINATION_CREATION);
    }

    static abortOrdinationEditing() {
        dispatcher.fireEnd(OrdinationEditorActionTypes.ABORT_ORDINATION_EDITING);
    }

    static beginOrdinationEditing(uuid) {
        dispatcher.fireEnd(OrdinationEditorActionTypes.BEGIN_ORDINATION_EDITING, uuid);
    }

    static selectOrdinationPage(page) {
        dispatcher.fireEnd(OrdinationEditorActionTypes.SELECT_ORDINATION_PAGE, page);
    }

    static onConfirmOrders(tableUuid, ordinationUuid, orders) {
        asyncActionBuilder.put(
            OrdinationEditorActionTypes.UPDATE_ORDERS,
            'dining-tables/' + ordinationUuid + '/orders', orders);
    }

    static onAbortOrders() {
        dispatcher.fireEnd(OrdinationEditorActionTypes.ABORT_ORDERS_EDITING);
    }

    static printOrdination(uuid) {
        asyncActionBuilder.post(
            OrdinationEditorActionTypes.PRINT_ORDINATION,
            'printers/print',
            uuid
        );
    }

    static abortOrdination(uuid) {
        asyncActionBuilder.put(
            OrdinationEditorActionTypes.ABORT_ORDINATION,
            'ordinations/' + uuid + "/abort"
        );
    }

    static beginOrdinationDeletion() {
        dispatcher.fireEnd(OrdinationEditorActionTypes.BEGIN_ORDINATION_DELETION);
    }

    static abortOrdinationDeletion() {
        dispatcher.fireEnd(OrdinationEditorActionTypes.ABORT_ORDINATION_DELETION);
    }

    static deleteOrdination(tabUuid, ordUuid) {
        asyncActionBuilder.remove(
            OrdinationEditorActionTypes.DELETE_ORDINATION,
            'dining-tables/' + tabUuid + "/ordinations",
            ordUuid
        );
    }
};