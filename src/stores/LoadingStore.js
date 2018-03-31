import AbstractStore from "./RootFeatureStore";

const EVT_LOADING_STORE_CHANGED = "EVT_LOADING_STORE_CHANGED";

class LoadingStore extends AbstractStore {
    constructor() {
        super(EVT_LOADING_STORE_CHANGED);
        this.inProgress = [];
    }

    handleStartedAction(action) {
        this.inProgress.push(action.type);
        return true;
    }

    handleCompletedAction(action) {
        return this.removeAction(action);
    }

    handleErrorAction(action) {
        return this.removeAction(action);
    }

    handleFailedAction(action) {
        return this.removeAction(action);
    }

    removeAction(action){
        let index = this.inProgress.findIndex(t => t === action.type);
        if(index !== -1) {
            this.inProgress.splice(index , 1);
            return true;
        }
        return false;
    }

    isBusy(){
        return this.inProgress.length > 0;
    }
}

const loadingStore = new LoadingStore();
export default loadingStore;