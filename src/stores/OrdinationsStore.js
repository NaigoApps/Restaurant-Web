import {
    ACT_CREATE_ORDINATION,
    ACT_RETRIEVE_ORDINATIONS,
    ACT_SELECT_DINING_TABLE,
    ACT_SELECT_ORDINATION
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_ORDINATION_STORE_CHANGED = "EVT_ORDINATION_STORE_CHANGED";

class OrdinationsStore extends AbstractEntityStore {

    constructor() {
        super();
        this.selectedDiningTable = null;
        this.selectedOrdination = null;
    }

    getOrdinations() {
        return this.getLazyData().getPayload();
    }

    getDiningTableOrdinations() {
        let ordinations = this.getLazyData();
        if (this.selectedDiningTable) {
            return ordinations.getPayload().filter(o => o.table === this.selectedDiningTable);
        }
        return [];
    }

    selectOrdination(uuid) {
        this.selectedOrdination = uuid;
    }

    getSelectedOrdination() {
        return this.selectedOrdination;
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_ORDINATIONS:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_ORDINATIONS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_CREATE_ORDINATION:
                this.createData(action.body);
                break;
            case ACT_SELECT_DINING_TABLE:
                this.selectedDiningTable = action.body;
                break;
            case ACT_SELECT_ORDINATION:
                this.selectOrdination(action.body);
                break;
            default:
                changed = false;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_ORDINATION_STORE_CHANGED;
    }

}

const ordinationsStore = new OrdinationsStore();
export default ordinationsStore;