import {ACT_RETRIEVE_PHASES} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./generic/AbstractEntityStore";

const EVT_PHASES_STORE_CHANGED = "EVT_PHASES_STORE_CHANGED";

class PhasesStore extends AbstractEntityStore {
    constructor() {
        super(EVT_PHASES_STORE_CHANGED);
    }

    getPhases(){
        return this.getData();
    }


    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_PHASES:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_PHASES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const phasesStore = new PhasesStore();
export default phasesStore;