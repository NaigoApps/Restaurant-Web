import {
    ACT_ASK_SELECTED_EVENING,
    ACT_CREATE_BILL,
    ACT_CREATE_DINING_TABLE,
    ACT_CREATE_ORDINATION,
    ACT_DELETE_BILL, ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_EVENING,
    ACT_EDIT_ORDINATION,
    ACT_PRINT_ORDINATION,
    ACT_SELECT_EVENING,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_EVENING,
    ACT_UPDATE_ORDINATION
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./generic/AbstractEntityStore";
import {findIndexByUuid} from "../utils/Utils";

const {fromJS} = require('immutable');

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
                    let newEvening = evening.getPayload().updateIn(['diningTables'], tables => tables.push(fromJS(action.body)));
                    this.updateData(newEvening);
                }
                break;
            }
            case ACT_DELETE_DINING_TABLE: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTables = evening.getPayload().get('diningTables');
                    let removedIndex = findIndexByUuid(diningTables, action.body);
                    this.updateData(evening.getPayload().set('diningTables', diningTables.splice(removedIndex, 1)));
                }
                break;
            }
            case ACT_CREATE_ORDINATION: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTableIndex = findIndexByUuid(evening.getPayload().get('diningTables'), action.body.get('table'));
                    if (diningTableIndex !== -1) {
                        let diningTable = evening.getPayload().get('diningTables').get(diningTableIndex);
                        let ordinations = diningTable.get('ordinations').push(action.body);
                        diningTable = diningTable.set('ordinations', ordinations);
                        let newEvening = evening.getPayload().updateIn(['diningTables'], tables =>
                            tables.splice(diningTableIndex, 1, diningTable));
                        this.updateData(newEvening);
                    }
                }
                break;
            }
            case ACT_DELETE_BILL:
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let tables = evening.getPayload().diningTables;
                    tables.forEach(table => {
                        let index = findIndexByUuid(table.bills, action.body);
                        if (index !== -1) {
                            table.bills.splice(index, 1);
                        }
                    });
                    this.updateData(evening.getPayload());
                }
                break;
            case ACT_CREATE_BILL:
            case ACT_UPDATE_DINING_TABLE: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTableIndex = findIndexByUuid(evening.getPayload().get('diningTables'), action.body.uuid);
                    let newEvening = evening.getPayload().updateIn(['diningTables'], tables =>
                        tables.splice(diningTableIndex, 1, fromJS(action.body)));
                    this.updateData(newEvening);
                }
                break;
            }
            case ACT_PRINT_ORDINATION:
            case ACT_UPDATE_ORDINATION: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTableIndex = findIndexByUuid(evening.getPayload().get('diningTables'), action.body.get('table'));
                    if (diningTableIndex !== -1) {
                        let diningTable = evening.getPayload().get('diningTables').get(diningTableIndex);
                        let ordinationIndex = findIndexByUuid(diningTable.get('ordinations'), action.body.get('uuid'));
                        if (ordinationIndex !== -1) {
                            let ordinations = diningTable.get('ordinations').splice(ordinationIndex, 1, action.body);
                            diningTable = diningTable.set('ordinations', ordinations);
                            let newEvening = evening.getPayload().updateIn(['diningTables'], tables =>
                                tables.splice(diningTableIndex, 1, diningTable));
                            this.updateData(newEvening);
                        }
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