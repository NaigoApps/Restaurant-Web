import EventEmitter from "events";
import dispatcher from "../dispatcher/SimpleDispatcher";

export default class AbstractStore extends EventEmitter{
    constructor(changeEvent){
        super();
        this.token = dispatcher.register(this.handleAction.bind(this));
        this.changeEvent = changeEvent;
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

    handleAction(action){
        let changed = false;
        if(action.isCompleted()){
            changed |= this.handleCompletedAction(action);
        }else if(action.isInProgress()){
            changed |= this.handleStartedAction(action);
        }else if(action.isError()){
            changed |= this.handleErrorAction(action);
        }else if(action.isFailed()){
            changed |= this.handleFailedAction(action);
        }
        if(changed) {
            this.emit(this.changeEvent, this.getState());
        }
    }

    getState(){
        console.warn("No getState() method definition in " + this.constructor.name);
        return null;
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
