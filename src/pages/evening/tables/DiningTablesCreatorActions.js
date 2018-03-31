import requestBuilder from "../../../actions/RequestBuilder";
import {
    ACT_BEGIN_DINING_TABLE_CREATION, ACT_BEGIN_ENTITY_EDITING, ACT_CREATE_DINING_TABLE,
    ACT_SET_ENTITY_PROPERTY
} from "../../../actions/ActionTypes";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {CREATING_MODE, DINING_TABLE_TYPE} from "../../../stores/EntityEditorStore";
import {findByUuid} from "../../../utils/Utils";

const {fromJS} = require('immutable');

class DiningTablesCreatorActions {

    beginDiningTableCreation() {
        dispatcher.fireEnd(ACT_BEGIN_DINING_TABLE_CREATION);
    }

    updateDiningTableCoverCharges(value) {
        dispatcher.fireEnd(ACT_SET_ENTITY_PROPERTY, fromJS({
            type: DINING_TABLE_TYPE,
            property: "coverCharges",
            value: value
        }));
    }

    updateDiningTableWaiter(value) {
        dispatcher.fireEnd(ACT_SET_ENTITY_PROPERTY, fromJS({
            type: DINING_TABLE_TYPE,
            property: "waiter",
            value: value
        }));
    }

    updateDiningTableTable(value) {
        dispatcher.fireEnd(ACT_SET_ENTITY_PROPERTY, fromJS({
            type: DINING_TABLE_TYPE,
            property: "table",
            value: value
        }));
    }

    createDiningTable(table) {
        requestBuilder.post(ACT_CREATE_DINING_TABLE, 'evenings/tables', table)
            .then(result => {
                dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                    type: DINING_TABLE_TYPE,
                    entity: result.get(1)
                }));
            });
    }
}

const diningTablesCreatorActions = new DiningTablesCreatorActions();

export default diningTablesCreatorActions;