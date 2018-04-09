import asyncActionBuilder from '../../actions/RequestBuilder';
import {ACT_DELETE_DINING_TABLE} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_EVENING_EDITOR_CC_ABORT,
    ACT_EVENING_EDITOR_CC_CHAR,
    ACT_EVENING_EDITOR_CC_CONFIRM,
    ACT_EVENING_EDITOR_CC_START
} from "./EveningEditorActionTypes";

const {fromJS} = require('immutable');

export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";

class EveningEditorActions {

    onStartCCEditing() {
        dispatcher.fireEnd(ACT_EVENING_EDITOR_CC_START);
    }

    onCCChar(char) {
        dispatcher.fireEnd(ACT_EVENING_EDITOR_CC_CHAR, char);
    }

    onConfirmCCEditing(uuid, value) {
        asyncActionBuilder.put(
            ACT_EVENING_EDITOR_CC_CONFIRM,
            'evenings/' + uuid + "/coverCharge",
            value
        )
    }

    onAbortCCEditing() {
        dispatcher.fireEnd(ACT_EVENING_EDITOR_CC_ABORT);
    }

    mergeDiningTable(uuid1, uuid2) {
        //FIXME
        asyncActionBuilder.post(
            ACT_UPDATE_EVENING,
            'evenings/tables/merge/' + uuid1,
            uuid2
        )
        //     .then(dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
        //     type: DINING_TABLE_TYPE,
        //     entity: uuid2
        // })));
    }

    deleteEveningDiningTable(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_DINING_TABLE, 'evenings/diningTables', uuid);
    }

}

const eveningEditorActions = new EveningEditorActions();

export default eveningEditorActions;