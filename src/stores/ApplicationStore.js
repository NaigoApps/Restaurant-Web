import AbstractStore from "./RootFeatureStore";
import {
    ACT_DISMISS_FULL_SCREEN, ACT_GO_TO_PAGE, ACT_GOTO_FULLSCREEN, ACT_REQUEST_FULL_SCREEN,
    ACT_TOGGLE_FULL_SCREEN
} from "../actions/ActionTypes";

export const EVT_APPLICATION_STORE_CHANGED = "EVT_APPLICATION_STORE_CHANGED";

class ApplicationStore extends AbstractStore {

    constructor() {
        super(EVT_APPLICATION_STORE_CHANGED);
        this.isFullScreen = false;
        this.currentPage = null;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            //FIXME
            case ACT_TOGGLE_FULL_SCREEN:
                // this.isFullScreen = !this.isFullScreen;
                break;
            case ACT_REQUEST_FULL_SCREEN:
                // this.isFullScreen = true;
                break;
            case ACT_DISMISS_FULL_SCREEN:
                // this.isFullScreen = false;
                break;
            case ACT_GO_TO_PAGE:
                this.currentPage = action.body;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState(){
        return {
            fullScreen: this.isFullScreen,
            currentPage: this.currentPage
        };
    }

}

const applicationStore = new ApplicationStore();
export default applicationStore;