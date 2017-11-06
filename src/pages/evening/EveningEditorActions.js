import asyncActionBuilder from '../../actions/RequestBuilder';

export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";

class EveningEditorActions {


    updateCoverCharge(eveningUuid, value){
        asyncActionBuilder.put(
            'evenings/' + eveningUuid + "/coverCharge",
            value,
            ACT_UPDATE_EVENING
        );
    }

}

const eveningEditorActions = new EveningEditorActions();

export default eveningEditorActions;