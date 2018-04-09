import dispatcher from "../../../../dispatcher/SimpleDispatcher";

const {fromJS} = require('immutable');

export const OrdinationsActionTypes = {
    BEGIN_ORDINATION_CREATION : "BEGIN_ORDINATION_CREATION",
    ABORT_ORDINATION_CREATION : "ABORT_ORDINATION_CREATION",
};

export const OrdinationsCreatorActions = {

    beginOrdinationCreation : () => dispatcher.fireEnd(OrdinationsActionTypes.BEGIN_ORDINATION_CREATION),

    abortOrdinationCreation: () => dispatcher.fireEnd(OrdinationsActionTypes.ABORT_ORDINATION_CREATION)

    // createOrdination(table, orders) {
    //     //FIXME
    //     // requestBuilder.post(ACT_CREATE_ORDINATION, 'dining-tables/' + table + '/ordinations', orders)
    //     //     .then(result => {
    //     //         dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
    //     //             type: ORDINATION_TYPE,
    //     //             entity: result.get(1)
    //     //         }));
    //     //     });
    // }

};