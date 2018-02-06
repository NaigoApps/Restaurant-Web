import requestBuilder from "../../actions/RequestBuilder";
import {ACT_ABORT_ENTITY_EDITING, ACT_BEGIN_ENTITY_EDITING, ACT_CREATE_ORDINATION} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ORDERS_TYPE, ORDINATION_TYPE} from "../../stores/EntityEditorStore";

const {fromJS} = require('immutable');

class OrdinationsCreatorActions {

    beginOrdinationCreation() {
        let newOrdination = EntitiesUtils.newOrdination();
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: ORDINATION_TYPE,
            entity: newOrdination
        }));
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: ORDERS_TYPE,
            entity: newOrdination.get('orders')
        }));
    }

    abortOrdinationCreation() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDINATION_TYPE);
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, ORDERS_TYPE);
    }

    createOrdination(table, orders) {
        requestBuilder.post(ACT_CREATE_ORDINATION, 'dining-tables/' + table + '/ordinations', orders);
    }

}

const ordinationsCreatorActions = new OrdinationsCreatorActions();

export default ordinationsCreatorActions;