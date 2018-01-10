import {
    ACT_BEGIN_CREATE_RESTAURANT_TABLE,
    ACT_BEGIN_CREATE_RESTAURANT_TABLES,
    ACT_CREATE_RESTAURANT_TABLE,
    ACT_DELETE_RESTAURANT_TABLE,
    ACT_DESELECT_RESTAURANT_TABLE,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_SELECT_RESTAURANT_TABLE,
    ACT_UPDATE_RESTAURANT_TABLE,
    ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME
} from "../../actions/ActionTypes";
import {strcmp} from "../../utils/Utils";
import LazyData, {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_TABLE_STORE_CHANGED = "EVT_TABLE_STORE_CHANGED";

class TablesStore extends AbstractEntityStore {

    constructor() {
        super(EVT_TABLE_STORE_CHANGED);
    }

    getAllTables() {
        return this.getData();
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_RESTAURANT_TABLES:
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
            case ACT_CREATE_RESTAURANT_TABLE:
                this.createData(action.body);
                break;
            case ACT_RETRIEVE_RESTAURANT_TABLES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_UPDATE_RESTAURANT_TABLE:
                this.updateData(action.body);
                break;
            case ACT_DELETE_RESTAURANT_TABLE:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const tablesStore = new TablesStore();
export default tablesStore;