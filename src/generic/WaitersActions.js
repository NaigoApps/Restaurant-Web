import asyncActionBuilder from "../actions/RequestBuilder";
import {DataActionTypes} from "../actions/DataActions";

class WaitersActions {

    retrieveWaiters() {
        return asyncActionBuilder.get(DataActionTypes.LOAD_WAITERS, 'waiters');
    }

    retrieveWaiterStatuses() {
        return asyncActionBuilder.get(DataActionTypes.LOAD_WAITER_STATUSES, 'waiter-statuses');
    }

}

const waitersActions = new WaitersActions();
export default waitersActions;