import asyncActionBuilder from '../../actions/RequestBuilder';

export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";

class EveningEditorActions {


    updateCoverCharge(eveningUuid, value){
        asyncActionBuilder.put(
            ACT_UPDATE_EVENING,
            'evenings/' + eveningUuid + "/coverCharge",
            value
        );
    }

}

const eveningEditorActions = new EveningEditorActions();

export default eveningEditorActions;