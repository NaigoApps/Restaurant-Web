import asyncActionBuilder from '../../actions/RequestBuilder';
import {ACT_BEGIN_ENTITY_EDITING, ACT_DELETE_DINING_TABLE} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {DINING_TABLE_TYPE} from "../../stores/EntityEditorStore";
import {
    ACT_EVENING_EDITOR_CC_ABORT,
    ACT_EVENING_EDITOR_CC_CHAR,
    ACT_EVENING_EDITOR_CC_CONFIRM,
    ACT_EVENING_EDITOR_CC_START
} from "./EveningEditorActionTypes";
import {EVENING_COVER_CHARGE_EDITOR} from "./Topics";

const {fromJS} = require('immutable');

export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";

class EveningEditorActions {

    onStartCCEditing() {
        dispatcher.fireEnd(ACT_EVENING_EDITOR_CC_START, null, [EVENING_COVER_CHARGE_EDITOR]);
    }

    onCCChar(char) {
        dispatcher.fireEnd(ACT_EVENING_EDITOR_CC_CHAR, char, [EVENING_COVER_CHARGE_EDITOR]);
    }

    onConfirmCCEditing(uuid, value) {
        asyncActionBuilder.put(
            ACT_EVENING_EDITOR_CC_CONFIRM,
            'evenings/' + uuid + "/coverCharge",
            value,
            null,
            [EVENING_COVER_CHARGE_EDITOR]
        )
    }

    onAbortCCEditing() {
        dispatcher.fireEnd(ACT_EVENING_EDITOR_CC_ABORT, null, [EVENING_COVER_CHARGE_EDITOR]);
    }

    mergeDiningTable(uuid1, uuid2) {
        asyncActionBuilder.post(
            ACT_UPDATE_EVENING,
            'evenings/tables/merge/' + uuid1,
            uuid2
        ).then(dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
            type: DINING_TABLE_TYPE,
            entity: uuid2
        })));
    }

    deleteEveningDiningTable(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_DINING_TABLE, 'evenings/diningTables', uuid);
    }

}

const eveningEditorActions = new EveningEditorActions();

export default eveningEditorActions;