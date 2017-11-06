import {
    ACT_DELETE_ADDITION,
    ACT_DESELECT_ADDITION,
    ACT_SELECT_ADDITION,
    ACT_UPDATE_ADDITION
} from "../../actions/ActionTypes";
import asyncActionBuilder from "../../actions/RequestBuilder";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class AdditionsEditorActions {

    deleteAddition(addition){
        asyncActionBuilder.remove(ACT_DELETE_ADDITION, "additions", addition);
    }

    updateAdditionName(uuid, name) {
        asyncActionBuilder.put(ACT_UPDATE_ADDITION, "additions/" + uuid + "/name", name)
    }

    updateAdditionPrice(uuid, price) {
        asyncActionBuilder.put(ACT_UPDATE_ADDITION, "additions/" + uuid + "/price", price)
    }

    updateAdditionGeneric(uuid, generic) {
        asyncActionBuilder.put(ACT_UPDATE_ADDITION, "additions/" + uuid + "/generic", generic.toString())
    }

    selectAddition(addition){
        dispatcher.fireEnd(ACT_SELECT_ADDITION, addition);
    }

    deselectAddition(){
        dispatcher.fireEnd(ACT_DESELECT_ADDITION);
    }
}

const additionsEditorActions = new AdditionsEditorActions();
export default additionsEditorActions;