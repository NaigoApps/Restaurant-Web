import AbstractStore from "./AbstractStore";
import ErrorActions from "./ErrorActions";

const EVT_ERRORS_STORE_CHANGED = "EVT_ERRORS_STORE_CHANGED";

class ErrorsStore extends AbstractStore {
    constructor() {
        super("error", EVT_ERRORS_STORE_CHANGED);
        this.lastMessage = null;
    }

    handleErrorAction(action) {
        this.lastMessage = action.body;
        return true;
    }

    getActionsClass(){
        return ErrorActions;
    }

    getActionCompletedHandlers(){
        const handlers = {};

        handlers[ErrorActions.CLEAR_ERROR_MESSAGES] = () => this.clearMessages();

        return handlers;
    }

    handleFailedAction(action) {
        this.lastMessage = "Impossibile comunicare con il server";
        return true;
    }

    buildState(){
        return {
            message: this.lastMessage
        }
    }

    clearMessages(){
        this.lastMessage = null;
    }
}

const errorsStore = new ErrorsStore();
export default errorsStore;