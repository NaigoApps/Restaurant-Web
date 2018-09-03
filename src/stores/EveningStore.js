import {
    ACT_DELETE_BILL,
    ACT_DELETE_DINING_TABLE,
    ACT_DELETE_ORDINATION,
    ACT_UPDATE_ORDINATION
} from "../actions/DataActions";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./generic/AbstractEntityStore";
import {findIndexByUuid} from "../utils/Utils";
import {OrdinationCreatorActionTypes} from "../pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationsCreatorActions";
import {OrdinationEditorActionTypes} from "../pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationsEditorActions";
import {EveningEditingActionTypes} from "../pages/eveningEditing/EveningEditorActions";
import {EveningSelectorActionTypes} from "../pages/eveningEditing/eveningSelector/EveningSelectorActions";
import {DiningTablesEditorActionTypes} from "../pages/eveningEditing/diningTableEditing/DiningTablesEditorActions";
import {DiningTablesClosingActionTypes} from "../pages/eveningEditing/diningTableEditing/tableClosingFeature/DiningTablesClosingActions";

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
            case EveningSelectorActionTypes.CHOOSE:
            // case ACT_ASK_SELECTED_EVENING:
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
            case EveningSelectorActionTypes.CHOOSE:
            case EveningEditingActionTypes.GET_SELECTED:
            case DiningTablesEditorActionTypes.MERGE_DINING_TABLE:
                this.setData([action.body]);
                this.setStatus(STATUSES.LOADED);
                this.sortTables();
                break;
            case EveningEditingActionTypes.DESELECT:
                this.setData([]);
                break;
            case EveningEditingActionTypes.CONFIRM_COVER_CHARGE_EDITING:
                this.updateData(action.body);
                break;
            case DiningTablesEditorActionTypes.CREATE_DINING_TABLE: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let tables = evening.getPayload().get('diningTables');
                    tables = tables.push(action.body);
                    this.updateData(evening.getPayload().set('diningTables', tables));
                    this.sortTables();
                }
                break;
            }
            case DiningTablesEditorActionTypes.DELETE_DINING_TABLE: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTables = evening.getPayload().get('diningTables');
                    let removedIndex = findIndexByUuid(diningTables, action.body);
                    this.updateData(evening.getPayload().set('diningTables', diningTables.splice(removedIndex, 1)));
                }
                break;
            }
            case OrdinationCreatorActionTypes.CREATE_ORDINATION: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTableIndex = findIndexByUuid(evening.getPayload().get('diningTables'), action.body.get('table'));
                    if (diningTableIndex !== -1) {
                        let diningTable = evening.getPayload().get('diningTables').get(diningTableIndex);
                        diningTable = diningTable.set('ordinations', diningTable.get('ordinations').push(action.body));
                        let tables = evening.getPayload().get('diningTables');
                        tables = tables.splice(diningTableIndex, 1);
                        tables = tables.push(diningTable);
                        let newEvening = evening.getPayload().set('diningTables', tables);
                        this.updateData(newEvening);
                        this.sortTables();
                    }
                }
                break;
            }
            case DiningTablesClosingActionTypes.PRINT_BILL:
            case DiningTablesClosingActionTypes.DELETE_BILL:
            case DiningTablesClosingActionTypes.CONFIRM_CLOSING:
            case DiningTablesClosingActionTypes.LOCK_TABLE:
            case OrdinationEditorActionTypes.DELETE_ORDINATION:
            case DiningTablesEditorActionTypes.CONFIRM_CCS:
            case DiningTablesEditorActionTypes.CONFIRM_WAITER:
            case DiningTablesEditorActionTypes.CONFIRM_TABLE:
            case DiningTablesEditorActionTypes.PRINT_PARTIAL_BILL:
            case OrdinationEditorActionTypes.UPDATE_ORDERS:
            case ACT_DELETE_ORDINATION: {
                let evening = this.getSingleData();
                if (evening.isLoaded()) {
                    let diningTableIndex = findIndexByUuid(evening.getPayload().get('diningTables'), action.body.get('uuid'));
                    let newEvening = evening.getPayload().updateIn(['diningTables'], tables =>
                        tables.splice(diningTableIndex, 1, fromJS(action.body)));
                    this.updateData(newEvening);
                }
                break;
            }
            case OrdinationEditorActionTypes.PRINT_ORDINATION:
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

    sortTables(){
        let tables = this.getEvening().getPayload()
            .get('diningTables')
            .sort((t1, t2) => -t1.get('openingTime').localeCompare(t2.get('openingTime')));

        this.setData([
            this.getEvening().getPayload().set('diningTables', tables)
        ]);
    }

    getChangeEvent() {
        return EVT_EVENING_STORE_CHANGED;
    }
}

const eveningStore = new EveningStore();
export default eveningStore;