import AbstractStore from "./AbstractStore";
import {ACT_REMOVE_FAILED_ACTION} from "../actions/ActionTypes";

const EVT_FAILURE_STORE_CHANGED = "EVT_FAILURE_STORE_CHANGED";

class FailureStore extends AbstractStore {
    constructor() {
        super();
        this.failed = null;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type){
            case ACT_REMOVE_FAILED_ACTION:
                this.removeAction();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleErrorAction(action) {
        this.failed = action;
        return true;
    }

    handleFailedAction(action) {
        this.failed = action;
        return true;
    }

    removeAction(action){
        if(this.failed){
            this.failed = null;
            return true;
        }
        return false;
    }

    getFailedAction(){
        return this.failed;
    }

    getChangeEvent(){
        return EVT_FAILURE_STORE_CHANGED;
    }
}

const failureStore = new FailureStore();
export default failureStore;