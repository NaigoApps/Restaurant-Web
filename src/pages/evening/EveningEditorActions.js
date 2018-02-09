import asyncActionBuilder from '../../actions/RequestBuilder';
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {ACT_UPDATE_ENTITY} from "../../actions/ActionTypes";
import {EVENING_TYPE} from "../../stores/EntityEditorStore";

const {fromJS} = require('immutable');

export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";

class EveningEditorActions {


    updateCoverCharge(eveningUuid, value){
        asyncActionBuilder.put(
            ACT_UPDATE_EVENING,
            'evenings/' + eveningUuid + "/coverCharge",
            value
        ).then(evening => {
            dispatcher.fireEnd(ACT_UPDATE_ENTITY, fromJS({
                type: EVENING_TYPE,
                updater: old => evening
            }))
        });
    }

}

const eveningEditorActions = new EveningEditorActions();

export default eveningEditorActions;