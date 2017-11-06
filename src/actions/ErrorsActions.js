import {ACT_CLEAR_ERROR_MESSAGES, ACT_REMOVE_FAILED_ACTION} from "./ActionTypes";
import dispatcher from "../dispatcher/SimpleDispatcher";


class ErrorsActions {
    clearMessages() {
        dispatcher.fireEnd(ACT_CLEAR_ERROR_MESSAGES);
    }

}

const errorActions = new ErrorsActions();
export default errorActions;