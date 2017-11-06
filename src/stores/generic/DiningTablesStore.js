import {
    ACT_CREATE_DINING_TABLE,
    ACT_DELETE_DINING_TABLE,
    ACT_RETRIEVE_DINING_TABLES,
    ACT_UPDATE_DINING_TABLE
} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "../AbstractEntityStore";

export const EVT_DINING_TABLES_STORE_CHANGED = "EVT_DINING_TABLES_STORE_CHANGED";

class DiningTablesStore extends AbstractEntityStore {
    constructor() {
        super(EVT_DINING_TABLES_STORE_CHANGED);
    }

    getTables(){
        return this.getLazyData().getPayload();
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_DINING_TABLES:
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
            case ACT_RETRIEVE_DINING_TABLES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_CREATE_DINING_TABLE:
                this.createData(action.body);
                break;
            case ACT_UPDATE_DINING_TABLE:
                this.updateData(action.body);
                break;
            case ACT_DELETE_DINING_TABLE:
                this.deleteData(action.body);
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const diningTablesStore = new DiningTablesStore();
export default diningTablesStore;