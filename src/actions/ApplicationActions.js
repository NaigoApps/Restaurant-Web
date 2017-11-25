import {ACT_TOGGLE_FULL_SCREEN} from "./ActionTypes";
import dispatcher from "../dispatcher/SimpleDispatcher";

class ApplicationActions {

    toggleFullScreen() {
        dispatcher.fireEnd(ACT_TOGGLE_FULL_SCREEN);
    }
}

const applicationActions = new ApplicationActions();
export default applicationActions;