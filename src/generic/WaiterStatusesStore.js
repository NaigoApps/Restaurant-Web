import {ACT_RETRIEVE_WAITER_STATUSES} from "../actions/ActionTypes";
import {STATUSES} from "../stores/LazyData";
import AbstractDataStore from "../stores/AbstractDataStore";

export const EVT_WAITER_STATUSES_STORE_CHANGED = "EVT_WAITER_STATUSES_STORE_CHANGED";

class WaiterStatusesStore extends AbstractDataStore {

    constructor() {
        super(EVT_WAITER_STATUSES_STORE_CHANGED);
    }

    getWaiterStatuses() {
        return this.getData();
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_WAITER_STATUSES:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_WAITER_STATUSES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const waiterStatusesStore = new WaiterStatusesStore();
export default waiterStatusesStore;