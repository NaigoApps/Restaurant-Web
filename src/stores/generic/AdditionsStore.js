import {
    ACT_BEGIN_CREATE_ADDITION,
    ACT_CREATE_ADDITION,
    ACT_DELETE_ADDITION,
    ACT_DESELECT_ADDITION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_SELECT_ADDITION,
    ACT_UPDATE_ADDITION,
    ACT_UPDATE_ADDITION_GENERIC,
    ACT_UPDATE_ADDITION_NAME,
    ACT_UPDATE_ADDITION_PRICE
} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

const EVT_ADDITIONS_STORE_CHANGE = "EVT_ADDITIONS_STORE_CHANGE";

class AdditionsStore extends AbstractEntityStore {
    constructor() {
        super(EVT_ADDITIONS_STORE_CHANGE);
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_ADDITIONS:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_ADDITIONS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_CREATE_ADDITION:
                this.createData(action.body);
                break;
            case ACT_UPDATE_ADDITION:
                this.updateData(action.body);
                break;
            case ACT_DELETE_ADDITION:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getAdditions() {
        return this.getData();
    }

    getChangeEvent() {
        return EVT_ADDITIONS_STORE_CHANGE;
    }

}


const additionsStore = new AdditionsStore();
export default additionsStore;