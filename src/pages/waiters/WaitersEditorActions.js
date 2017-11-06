import {
    ACT_BEGIN_CREATE_WAITER, ACT_DELETE_WAITER,
    ACT_DESELECT_WAITER,
    ACT_SELECT_WAITER, ACT_UPDATE_WAITER,
    ACT_UPDATE_WAITER_CF,
    ACT_UPDATE_WAITER_NAME,
    ACT_UPDATE_WAITER_SURNAME
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class WaitersEditorActions {

    selectWaiter(waiter) {
        dispatcher.fireEnd(ACT_SELECT_WAITER, waiter);
    }

    deselectWaiter(){
        dispatcher.fireEnd(ACT_DESELECT_WAITER);
    }

    updateWaiterName(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_WAITER,
            'waiters/' + uuid + '/name',
            value
        );
    }

    updateWaiterSurname(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_WAITER,
            'waiters/' + uuid + '/surname',
            value
        );
    }

    updateWaiterCf(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_WAITER,
            'waiters/' + uuid + '/cf',
            value
        );
    }

    updateWaiterStatus(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_WAITER,
            'waiters/' + uuid + '/status',
            value
        );
    }

    deleteWaiter(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_WAITER, 'waiters', uuid);
    }

}

const waitersEditorActions = new WaitersEditorActions();
export default waitersEditorActions;