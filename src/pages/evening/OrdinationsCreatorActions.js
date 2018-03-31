import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_ABORT_ENTITY_EDITING, ACT_BEGIN_ENTITY_EDITING, ACT_CREATE_ORDINATION,
    ACT_UPDATE_ENTITY
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {CREATING_MODE, DINING_TABLE_TYPE, ORDERS_TYPE, ORDINATION_TYPE} from "../../stores/EntityEditorStore";
import {findByUuid} from "../../utils/Utils";

const {fromJS} = require('immutable');

class OrdinationsCreatorActions {

    beginOrdinationCreation() {
        let newOrdination = EntitiesUtils.newOrdination();
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: ORDINATION_TYPE,
            entity: newOrdination,
            mode: CREATING_MODE
        }));
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: ORDERS_TYPE,
            entity: newOrdination.get('orders'),
            mode: CREATING_MODE
        }));
    }

    abortOrdinationCreation() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDINATION_TYPE);
    }

    createOrdination(table, orders) {
        requestBuilder.post(ACT_CREATE_ORDINATION, 'dining-tables/' + table + '/ordinations', orders)
            .then(result => {
                dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                    type: ORDINATION_TYPE,
                    entity: result.get(1)
                }));
            });
    }

}

const ordinationsCreatorActions = new OrdinationsCreatorActions();

export default ordinationsCreatorActions;