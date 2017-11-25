import {
    ACT_ASK_SELECTED_EVENING, ACT_DESELECT_EVENING, ACT_SELECT_EVENING,
    ACT_UPDATE_EVENING
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_EVENING_STORE_CHANGED = "EVT_EVENING_STORE_CHANGED";

class EveningStore extends AbstractEntityStore {
    constructor() {
        super();
    }

    getEvening(){
        return this.getSingleLazyData().getPayload();
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_SELECT_EVENING:
            case ACT_ASK_SELECTED_EVENING:
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
            case ACT_SELECT_EVENING:
            case ACT_ASK_SELECTED_EVENING:
                this.setData([action.body]);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_DESELECT_EVENING:
                this.setData([]);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_UPDATE_EVENING:
                this.updateData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent(){
        return EVT_EVENING_STORE_CHANGED;
    }
}

const eveningStore = new EveningStore();
export default eveningStore;