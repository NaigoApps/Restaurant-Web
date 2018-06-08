import dispatcher from "../../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../../actions/RequestBuilder";

const {fromJS} = require('immutable');

export const OrdinationCreatorActionTypes = {
    BEGIN_ORDINATION_CREATION : "BEGIN_ORDINATION_CREATION",
    ABORT_ORDINATION_CREATION : "ABORT_ORDINATION_CREATION",
    CREATE_ORDINATION : "CREATE_ORDINATION"
};

export const OrdinationsCreatorActions = {

    beginOrdinationCreation : () => dispatcher.fireEnd(OrdinationCreatorActionTypes.BEGIN_ORDINATION_CREATION),

    abortOrdinationCreation: () => dispatcher.fireEnd(OrdinationCreatorActionTypes.ABORT_ORDINATION_CREATION),

    onConfirmOrders: (table, ordination, orders) => asyncActionBuilder.post(
        OrdinationCreatorActionTypes.CREATE_ORDINATION,
        'dining-tables/' + table + '/ordinations', orders),

    onAbortOrders: () => dispatcher.fireEnd(OrdinationCreatorActionTypes.ABORT_ORDINATION_CREATION),

};