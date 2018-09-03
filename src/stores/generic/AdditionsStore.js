import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";
import {AdditionsCreatorActionTypes} from "../../pages/additions/AdditionsCreatorActions";
import {AdditionsEditorActionTypes} from "../../pages/additions/AdditionsEditorActions";
import {DataActionTypes} from "../../actions/DataActions";

const EVT_ADDITIONS_STORE_CHANGE = "EVT_ADDITIONS_STORE_CHANGE";

class AdditionsStore extends AbstractEntityStore {
    constructor() {
        super(EVT_ADDITIONS_STORE_CHANGE);
    }

    comparator(a1, a2){
        return a1.get('name').toLowerCase().trim().localeCompare(a2.get('name').toLowerCase().trim());
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case DataActionTypes.LOAD_ADDITIONS:
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
            case DataActionTypes.LOAD_ADDITIONS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case AdditionsCreatorActionTypes.CREATE_ADDITION:
                this.createData(action.body);
                break;
            case AdditionsEditorActionTypes.UPDATE_EDITING_ADDITION:
                this.updateData(action.body);
                break;
            case AdditionsEditorActionTypes.DELETE_EDITING_ADDITION:
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