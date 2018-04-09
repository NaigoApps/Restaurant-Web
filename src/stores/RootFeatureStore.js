import EventEmitter from "events";
import dispatcher from "../dispatcher/SimpleDispatcher";

export default class RootFeatureStore extends EventEmitter{
    constructor(changeEvent){
        super();
        this.token = dispatcher.register(this.handleAction.bind(this));
        this.changeEvent = changeEvent;
        this.subFeatureStores = [];
    }

    getToken(){
        return this.token;
    }

    addChangeListener(callback){
        this.addListener(this.changeEvent, callback);
    }

    removeChangeListener(callback){
        this.removeListener(this.changeEvent, callback);
    }

    addSubFeature(subFeatureStore){
        this.subFeatureStores.push(subFeatureStore);
    }

    handleAction(action){
        let changed = false;

        dispatcher.waitFor(this.subFeatureStores.map(subFeature => subFeature.getToken()));

        if(action.isCompleted()){
            changed |= this.handleCompletedAction(action);
        }else if(action.isInProgress()){
            changed |= this.handleStartedAction(action);
        }else if(action.isError()){
            changed |= this.handleErrorAction(action);
        }else if(action.isFailed()){
            changed |= this.handleFailedAction(action);
        }

        this.subFeatureStores.forEach(store => {
            if(store.getActions().includes(action.type)){
                changed = true;
            }
        });

        if(changed) {
            this.emit(this.changeEvent, this.getState());
        }
    }

    buildState(){
        console.warn("No buildState() method definition in " + this.constructor.name);
    }

    getState(){
        let data = this.buildState();

        this.subFeatureStores.forEach(store => {
            data = data.set(store.getFeatureName(), store.getState());
        });

        return {
            data : data
        }
    }

    handleCompletedAction(action){
        console.warn("No completed event handler");
        return false;
    }
    handleStartedAction(action){
        console.warn("No started event handler");
        return false;
    }
    handleErrorAction(action){
        console.warn("No error event handler");
        return false;
    }
    handleFailedAction(action){
        console.warn("No failed event handler");
        return false;
    }
}
