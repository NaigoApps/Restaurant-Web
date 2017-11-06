import dispatcher from "../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_ADDITION,
    ACT_CREATE_ADDITION, ACT_DELETE_ADDITION, ACT_DESELECT_ADDITION, ACT_RETRIEVE_ADDITIONS, ACT_SELECT_ADDITION,
    ACT_UPDATE_ADDITION,
    ACT_UPDATE_ADDITION_GENERIC, ACT_UPDATE_ADDITION_NAME, ACT_UPDATE_ADDITION_PRICE
} from "../actions/ActionTypes";
import asyncActionBuilder from "../actions/RequestBuilder";

class AdditionsActions {

    retrieveAdditions() {
        asyncActionBuilder.get(ACT_RETRIEVE_ADDITIONS, "additions");
    }

    beginAdditionCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ADDITION);
    }

    createAddition(addition) {
        asyncActionBuilder.post(ACT_CREATE_ADDITION, "additions", addition)
    }

    deleteAddition(addition){
        asyncActionBuilder.remove(ACT_DELETE_ADDITION, "additions", addition);
    }

    updateImmediateAdditionName(uuid, name) {
        asyncActionBuilder.put(ACT_UPDATE_ADDITION, "additions/" + uuid + "/name", name)
    }

    updateImmediateAdditionPrice(uuid, price) {
        asyncActionBuilder.put(ACT_UPDATE_ADDITION, "additions/" + uuid + "/price", price)
    }

    updateImmediateAdditionGeneric(uuid, generic) {
        asyncActionBuilder.put(ACT_UPDATE_ADDITION, "additions/" + uuid + "/generic", generic.toString())
    }

    updateAdditionName(uuid, name) {
        dispatcher.fireEnd(ACT_UPDATE_ADDITION_NAME, name)
    }

    updateAdditionPrice(uuid, price) {
        dispatcher.fireEnd(ACT_UPDATE_ADDITION_PRICE, price)
    }

    updateAdditionGeneric(uuid, generic) {
        dispatcher.fireEnd(ACT_UPDATE_ADDITION_GENERIC, generic)
    }

    selectAddition(addition){
        dispatcher.fireEnd(ACT_SELECT_ADDITION, addition);
    }

    deselectAddition(){
        dispatcher.fireEnd(ACT_DESELECT_ADDITION);
    }
}

const additionsActions = new AdditionsActions();
export default additionsActions;