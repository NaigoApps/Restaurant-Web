import {ACT_REMOVE_FAILED_ACTION} from "./ActionTypes";
import dispatcher from "../dispatcher/SimpleDispatcher";


class FailureActions {

    removeMessage() {
        dispatcher.fireEnd(ACT_REMOVE_FAILED_ACTION);
    }

}

const failureActions = new FailureActions();
export default failureActions;