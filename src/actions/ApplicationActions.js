import {ACT_DISMISS_FULL_SCREEN, ACT_GO_TO_PAGE, ACT_REQUEST_FULL_SCREEN, ACT_TOGGLE_FULL_SCREEN} from "./ActionTypes";
import dispatcher from "../dispatcher/SimpleDispatcher";

class ApplicationActions {

    toggleFullScreen() {
        dispatcher.fireEnd(ACT_TOGGLE_FULL_SCREEN);
    }

    requestFullScreen() {
        dispatcher.fireEnd(ACT_REQUEST_FULL_SCREEN);
    }

    dismissFullScreen() {
        dispatcher.fireEnd(ACT_DISMISS_FULL_SCREEN);
    }

    goToPage(page) {
        dispatcher.fireEnd(ACT_GO_TO_PAGE, page);
    }
}

const applicationActions = new ApplicationActions();
export default applicationActions;