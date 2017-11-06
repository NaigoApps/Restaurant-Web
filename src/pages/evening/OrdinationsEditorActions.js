import {ACT_BEGIN_CREATE_ORDINATION, ACT_DELETE_ORDINATION, ACT_SELECT_ORDINATION} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class OrdinationsEditorActions {

    beginOrdinationCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ORDINATION);
    }

    selectOrdination(uuid){
        dispatcher.fireEnd(ACT_SELECT_ORDINATION, uuid);
    }

    deselectOrdination(){
        dispatcher.fireEnd(ACT_SELECT_ORDINATION, null);
    }

    deleteOrdination(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_ORDINATION, 'ordinations', uuid);
    }
}

const ordinationsEditorActions = new OrdinationsEditorActions();

export default ordinationsEditorActions;