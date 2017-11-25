import {
    ACT_BEGIN_CREATE_WAITER,
    ACT_CREATE_WAITER, ACT_DESELECT_WAITER,
    ACT_UPDATE_WAITER_CF,
    ACT_UPDATE_WAITER_NAME,
    ACT_UPDATE_WAITER_STATUS,
    ACT_UPDATE_WAITER_SURNAME
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class WaitersCreatorActions {

    beginWaiterCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_WAITER);
    }

    updateWaiterName(uuid, name) {
        dispatcher.fireEnd(ACT_UPDATE_WAITER_NAME, name);
    }

    updateWaiterSurname(uuid, surname) {
        dispatcher.fireEnd(ACT_UPDATE_WAITER_SURNAME, surname);
    }

    updateWaiterCf(uuid, cf) {
        dispatcher.fireEnd(ACT_UPDATE_WAITER_CF, cf);
    }

    updateWaiterStatus(uuid, status) {
        dispatcher.fireEnd(ACT_UPDATE_WAITER_STATUS, status);
    }

    createWaiter(waiter) {
        asyncActionBuilder.post(ACT_CREATE_WAITER, 'waiters', waiter);
    }

    deselectWaiter(){
        dispatcher.fireEnd(ACT_DESELECT_WAITER);
    }

}

const waitersCreatorActions = new WaitersCreatorActions();
export default waitersCreatorActions;