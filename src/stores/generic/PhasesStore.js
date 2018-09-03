import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";
import {numberCompare} from "../../utils/Utils";
import {DataActionTypes} from "../../actions/DataActions";

const EVT_PHASES_STORE_CHANGED = "EVT_PHASES_STORE_CHANGED";

class PhasesStore extends AbstractEntityStore {
    constructor() {
        super(EVT_PHASES_STORE_CHANGED);
    }

    getPhases(){
        return this.getData();
    }

    comparator(p1, p2){
        return numberCompare(p1, p2);
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case DataActionTypes.LOAD_PHASES:
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
            case DataActionTypes.LOAD_PHASES:
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