import dispatcher from "../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../actions/RequestBuilder";
import {Actions} from "./DiningTablesEditingActions";

const {fromJS} = require('immutable');

class DiningTablesCreatorActions {

    beginDiningTableCreation() {
        dispatcher.fireEnd(Actions.BEGIN_DINING_TABLE_CREATION);
    }

    onConfirm(table) {
        asyncActionBuilder.post(Actions.CREATE_DINING_TABLE, 'evenings/tables', table);
    }

    onConfirmCoverCharges(uuid, value) {
        dispatcher.fireEnd(Actions.CONFIRM_CREATOR_CCS, value);
    }

    onConfirmWaiter(uuid, value) {
        dispatcher.fireEnd(Actions.CONFIRM_CREATOR_WAITER, value);
    }

    onConfirmTable(uuid, value) {
        dispatcher.fireEnd(Actions.CONFIRM_CREATOR_TABLE, value);
    }


    updateDiningTableTable(value) {
        //FIXME
        // dispatcher.fireEnd(ACT_SET_ENTITY_PROPERTY, fromJS({
        //     type: DINING_TABLE_TYPE,
        //     property: "table",
        //     value: value
        // }));
    }
}

const diningTablesCreatorActions = new DiningTablesCreatorActions();

export default diningTablesCreatorActions;