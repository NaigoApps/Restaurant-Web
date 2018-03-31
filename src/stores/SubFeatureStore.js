import dispatcher from "../dispatcher/SimpleDispatcher";

export default class SubFeatureStore {
    constructor(rootStore, featureName) {
        this.token = dispatcher.register(this.handleAction.bind(this));
        this.featureName = featureName;
        rootStore.addSubFeature(this);
    }

    getToken() {
        return this.token;
    }

    getFeatureName() {
        return this.featureName;
    }

    getActions(){
        console.warn("No getActions() method definition in " + this.constructor.name);
        return [];
    }

    handleAction(action) {
        let changed = false;
        if (action.isCompleted()) {
            changed |= this.handleCompletedAction(action);
        } else if (action.isInProgress()) {
            changed |= this.handleStartedAction(action);
        } else if (action.isError()) {
            changed |= this.handleErrorAction(action);
        } else if (action.isFailed()) {
            changed |= this.handleFailedAction(action);
        }
        return changed;
    }

    getState() {
        console.warn("No getState() method definition in " + this.constructor.name);
        return null;
    }

    handleCompletedAction(action) {
        console.warn("No handleCompletedAction() method definition in " + this.constructor.name);
        return false;
    }

    handleStartedAction(action) {
        console.warn("No handleStartedAction() method definition in " + this.constructor.name);
        return false;
    }

    handleErrorAction(action) {
        console.warn("No handleErrorAction() method definition in " + this.constructor.name);
        return false;
    }

    handleFailedAction(action) {
        console.warn("No handleFailedAction() method definition in " + this.constructor.name);
        return false;
    }

}