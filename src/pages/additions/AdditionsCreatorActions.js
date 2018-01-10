import {
    ACT_BEGIN_CREATE_ADDITION,
    ACT_CREATE_ADDITION,
    ACT_DELETE_ADDITION,
    ACT_DESELECT_ADDITION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_SELECT_ADDITION,
    ACT_UPDATE_ADDITION,
    ACT_UPDATE_ADDITION_GENERIC,
    ACT_UPDATE_ADDITION_NAME,
    ACT_UPDATE_ADDITION_PRICE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class AdditionsCreatorActions {

    beginAdditionCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ADDITION);
    }

    createAddition(addition) {
        asyncActionBuilder.post(ACT_CREATE_ADDITION, "additions", addition)
    }

    updateAdditionName(name) {
        dispatcher.fireEnd(ACT_UPDATE_ADDITION_NAME, name)
    }

    updateAdditionPrice(price) {
        dispatcher.fireEnd(ACT_UPDATE_ADDITION_PRICE, price)
    }

    updateAdditionGeneric(generic) {
        dispatcher.fireEnd(ACT_UPDATE_ADDITION_GENERIC, generic)
    }
}

const additionsCreatorActions = new AdditionsCreatorActions();
export default additionsCreatorActions;