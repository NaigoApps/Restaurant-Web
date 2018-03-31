import AbstractStore from "./RootFeatureStore";
import {ACT_CLEAR_ERROR_MESSAGES} from "../actions/ActionTypes";

const EVT_ERRORS_STORE_CHANGED = "EVT_ERRORS_STORE_CHANGED";

class ErrorsStore extends AbstractStore {
    constructor() {
        super(EVT_ERRORS_STORE_CHANGED);
        this.lastMessage = null;
    }

    handleErrorAction(action) {
        this.lastMessage = action.body;
        return true;
    }

    handleCompletedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_CLEAR_ERROR_MESSAGES:
                this.clearMessages();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleFailedAction(action) {
        this.lastMessage = "Impossibile comunicare con il server";
        return true;
    }

    getMessage(){
        return this.lastMessage;
    }

    clearMessages(){
        this.lastMessage = null;
    }
}

const errorsStore = new ErrorsStore();
export default errorsStore;