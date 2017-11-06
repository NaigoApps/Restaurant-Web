import {
    ACT_CREATE_WAITER,
    ACT_DELETE_WAITER,
    ACT_RETRIEVE_WAITER_STATUSES,
    ACT_RETRIEVE_WAITERS,
    ACT_UPDATE_WAITER
} from "../actions/ActionTypes";
import asyncActionBuilder from "../actions/RequestBuilder";

class WaitersActions {

    retrieveWaiters() {
        return asyncActionBuilder.get(ACT_RETRIEVE_WAITERS, 'waiters');
    }

    retrieveWaiterStatuses() {
        return asyncActionBuilder.get(ACT_RETRIEVE_WAITER_STATUSES, 'waiter-statuses');
    }

}

const waitersActions = new WaitersActions();
export default waitersActions;