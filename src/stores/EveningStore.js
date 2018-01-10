import {
    ACT_ASK_SELECTED_EVENING,
    ACT_CREATE_DINING_TABLE,
    ACT_CREATE_ORDINATION,
    ACT_DESELECT_EVENING, ACT_EDIT_ORDINATION,
    ACT_SELECT_EVENING, ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_EVENING
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./generic/AbstractEntityStore";
import {findByUuid, findIndexByUuid} from "../utils/Utils";

export const EVT_EVENING_STORE_CHANGED = "EVT_EVENING_STORE_CHANGED";

class EveningStore extends AbstractEntityStore {
    constructor() {
        super();
    }

    getEvening() {
        return this.getSingleData();
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_SELECT_EVENING:
            case ACT_ASK_SELECTED_EVENING:
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
            case ACT_SELECT_EVENING:
            case ACT_ASK_SELECTED_EVENING:
                this.setData([action.body]);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_DESELECT_EVENING:
                this.setData([]);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_UPDATE_EVENING:
                this.updateData(action.body);
                break;
            case ACT_CREATE_DINING_TABLE: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    evening.getPayload().diningTables.push(action.body);
                    this.updateData(evening.getPayload());
                }
                break;
            }
            case ACT_UPDATE_DINING_TABLE: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTableIndex = findIndexByUuid(evening.getPayload().diningTables, action.body.uuid);
                    evening.getPayload().diningTables.splice(diningTableIndex, 1, action.body);
                    this.updateData(evening.getPayload());
                }
                break;
            }
            case ACT_CREATE_ORDINATION: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTable = findByUuid(evening.getPayload().diningTables, action.body.table);
                    if(diningTable){
                        diningTable.ordinations.push(action.body);
                        this.updateData(evening.getPayload());
                    }
                }

                break;
            }
            case ACT_EDIT_ORDINATION: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTable = findByUuid(evening.getPayload().diningTables, action.body.table);
                    if(diningTable){
                        let ordinationIndex = findIndexByUuid(diningTable.ordinations, action.body.uuid);
                        diningTable.ordinations.splice(ordinationIndex, 1, action.body);
                        this.updateData(evening.getPayload());
                    }
                }

                break;
            }
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_EVENING_STORE_CHANGED;
    }
}

const eveningStore = new EveningStore();
export default eveningStore;