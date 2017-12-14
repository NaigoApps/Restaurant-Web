import AbstractStore from "./AbstractStore";
import {
    ACT_DISMISS_FULL_SCREEN, ACT_GOTO_FULLSCREEN, ACT_REQUEST_FULL_SCREEN,
    ACT_TOGGLE_FULL_SCREEN
} from "../actions/ActionTypes";

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

class ApplicationStore extends AbstractStore {

    constructor() {
        super(EVT_APPLICATION_STORE_CHANGED);
        this.isFullScreen = false;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_TOGGLE_FULL_SCREEN:
                this.isFullScreen = !this.isFullScreen;
                break;
            case ACT_REQUEST_FULL_SCREEN:
                this.isFullScreen = true;
                break;
            case ACT_DISMISS_FULL_SCREEN:
                this.isFullScreen = false;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState(){
        return {
            fullScreen: this.isFullScreen
        };
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;