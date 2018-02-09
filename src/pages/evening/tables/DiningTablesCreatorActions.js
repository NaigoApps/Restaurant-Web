import requestBuilder from "../../../actions/RequestBuilder";
import {
    ACT_BEGIN_ENTITY_EDITING, ACT_CREATE_DINING_TABLE, ACT_SET_ENTITY_PROPERTY,
    ACT_UPDATE_ENTITY
} from "../../../actions/ActionTypes";
import dispatcher from "../../../dispatcher/SimpleDispatcher";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {DINING_TABLE_TYPE, EVENING_TYPE} from "../../../stores/EntityEditorStore";
import {findByUuid} from "../../../utils/Utils";

const {fromJS} = require('immutable');

class DiningTablesCreatorActions {

    beginDiningTableCreation() {
        dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: "DiningTable",
            entity: EntitiesUtils.newDiningTable()
        }));
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
                dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
                    type: EVENING_TYPE,
                    updater: oldEvening => result.get(0)
                }));
                dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                    type: DINING_TABLE_TYPE,
                    entity: findByUuid(result.get(0).get('diningTables'), result.get(1))
                }));
            });
    }
}

const diningTablesCreatorActions = new DiningTablesCreatorActions();

export default diningTablesCreatorActions;