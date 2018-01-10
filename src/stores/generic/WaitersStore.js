import {
    ACT_BEGIN_CREATE_WAITER,
    ACT_CREATE_WAITER,
    ACT_DELETE_WAITER,
    ACT_DESELECT_WAITER,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_WAITER,
    ACT_UPDATE_WAITER,
    ACT_UPDATE_WAITER_CF,
    ACT_UPDATE_WAITER_NAME,
    ACT_UPDATE_WAITER_SURNAME
} from "../../actions/ActionTypes";
import {strcmp} from "../../utils/Utils";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_WAITERS_STORE_CHANGED = "EVT_WAITERS_STORE_CHANGED";

class WaitersStore extends AbstractEntityStore {

    constructor() {
        super(EVT_WAITERS_STORE_CHANGED);
    }

    getWaiters() {
        return this.getData();
    }


    // getAvailableWaiters() {
    //     return this.getLazyData()
    //         .getPayload()
    //         .filter(w => w.status === "ATTIVO")
    //         .sort((w1, w2) => strcmp(w1.surname, w2.surname) || strcmp(w1.name, w2.name));
    // }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_WAITERS:
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
            case ACT_CREATE_WAITER:
                this.createData(action.body);
                break;
            case ACT_RETRIEVE_WAITERS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_UPDATE_WAITER:
                this.updateData(action.body);
                break;
            case ACT_DELETE_WAITER:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const waitersStore = new WaitersStore();
export default waitersStore;