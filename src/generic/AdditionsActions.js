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
}

const additionsActions = new AdditionsActions();
export default additionsActions;