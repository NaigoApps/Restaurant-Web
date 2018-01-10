import {
    ACT_ABORT_EDIT_ORDINATION,
    ACT_BEGIN_EDIT_ORDINATION,
    ACT_DELETE_ORDINATION,
    ACT_EDIT_ORDINATION,
    ACT_PRINT_ORDINATION,
    ACT_SELECT_ORDINATION
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class OrdinationsEditorActions {

    beginOrdinationEditing(){
        dispatcher.fireEnd(ACT_BEGIN_EDIT_ORDINATION);
    }

    abortOrdinationEditing(){
        dispatcher.fireEnd(ACT_ABORT_EDIT_ORDINATION);
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

    printOrdination(uuid){
        asyncActionBuilder.post(ACT_PRINT_ORDINATION, 'printers/print', uuid);
    }

    editOrdination(uuid, orders){
        asyncActionBuilder.put(ACT_EDIT_ORDINATION, 'ordinations/' + uuid + "/orders", orders)
    }
}

const ordinationsEditorActions = new OrdinationsEditorActions();

export default ordinationsEditorActions;