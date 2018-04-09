import SubFeatureStore from "../../../stores/SubFeatureStore";
import eveningPageStore from "../EveningPageStore";
import {Actions} from "./DiningTablesEditingActions";
import StoresUtils, {EditorStatus} from "../../StoresUtils";
import eveningStore from "../../../stores/EveningStore";
import {findByUuid, iSet} from "../../../utils/Utils";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {ACT_DESELECT_EVENING} from "../../../actions/ActionTypes";

const {Map, fromJS} = require('immutable');

class DiningTableEditorStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "diningTablesEditing");
        this.page = 0;
        this.status = EditorStatus.SURFING;
        this.diningTable = null;

    }

    resetDiningTableEditor(){
        this.ccsEditor = StoresUtils.createIntEditor();
        this.waiterEditor = StoresUtils.createSelectEditor();
        this.tableEditor = StoresUtils.createSelectEditor();
    }

    getState() {
        return Map({
            page: this.page,
            status: this.status,
            editor: Map({
                coverCharges: this.ccsEditor,
                waiter: this.waiterEditor,
                table: this.tableEditor
            }),
            diningTable: this.getSelectedDiningTable()
        })
    }

    getActions() {
        return Object.values(Actions).concat([ACT_DESELECT_EVENING]);
    }

    handleCompletedAction(action) {
        let table = this.getSelectedDiningTable();
        let oldCcs = 0;
        let oldWaiter = null;
        let oldTable = null;
        if (table) {
            oldCcs = table.get('coverCharges');
            oldWaiter = table.get('waiter');
            oldTable = table.get('table');
        }

        let changed = true;
        switch (action.type) {
            case Actions.SELECT_DINING_TABLE:
                this.diningTable = action.body;
                this.status = EditorStatus.EDITING;
                break;
                //FIXME
            case ACT_DESELECT_EVENING:
            case Actions.DESELECT_DINING_TABLE:
                this.diningTable = null;
                this.status = EditorStatus.SURFING;
                break;
            case Actions.BEGIN_DINING_TABLE_CREATION:
                this.resetDiningTableEditor();
                this.diningTable = EntitiesUtils.newDiningTable();
                this.status = EditorStatus.CREATING;
                break;
            case Actions.CREATE_DINING_TABLE:
                this.resetDiningTableEditor();
                this.diningTable = action.body.get('uuid');
                this.status = EditorStatus.EDITING;
                break;
            //CoverCharges
            case Actions.BEGIN_CCS_EDITING:
                this.ccsEditor = StoresUtils.initIntEditor(oldCcs);
                break;
            case Actions.CCS_CHANGE:
                this.ccsEditor = iSet(this.ccsEditor, "text", action.body);
                break;
            case Actions.CCS_CHAR:
                this.ccsEditor = StoresUtils.intChar(this.ccsEditor, action.body);
                break;
            case Actions.CONFIRM_CREATOR_CCS:
                this.diningTable = this.diningTable.set('coverCharges', action.body);
                this.ccsEditor = StoresUtils.createIntEditor(this.diningTable.get('coverCharges'));
                break;
            case Actions.CONFIRM_CCS:
            case Actions.ABORT_CCS:
                this.ccsEditor = StoresUtils.createIntEditor(oldCcs);
                break;
            //Waiter
            case Actions.BEGIN_WAITER_EDITING:
                this.waiterEditor = StoresUtils.initSelectEditor(oldWaiter);
                break;
            case Actions.SELECT_WAITER:
                this.waiterEditor = iSet(this.waiterEditor, "value", action.body);
                break;
            case Actions.SELECT_WAITER_PAGE:
                this.waiterEditor = iSet(this.waiterEditor, "page", action.body);
                break;
            case Actions.CONFIRM_CREATOR_WAITER:
                this.diningTable = this.diningTable.set('waiter', action.body);
                this.waiterEditor = StoresUtils.createSelectEditor(this.diningTable.get('waiter'));
                break;
            case Actions.CONFIRM_WAITER:
            case Actions.ABORT_WAITER:
                this.waiterEditor = StoresUtils.createSelectEditor(oldWaiter);
                break;
            //Table
            case Actions.BEGIN_TABLE_EDITING:
                this.tableEditor = StoresUtils.initSelectEditor(oldTable);
                break;
            case Actions.SELECT_TABLE:
                this.tableEditor = iSet(this.tableEditor, "value", action.body);
                break;
            case Actions.SELECT_TABLE_PAGE:
                this.tableEditor = iSet(this.tableEditor, "page", action.body);
                break;
            case Actions.CONFIRM_CREATOR_TABLE:
                this.diningTable = this.diningTable.set('table', action.body);
                this.tableEditor = StoresUtils.createSelectEditor(this.diningTable.get('table'));
                break;
            case Actions.CONFIRM_TABLE:
            case Actions.ABORT_TABLE:
                this.tableEditor = StoresUtils.createSelectEditor(oldTable);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getSelectedDiningTable() {
        if (this.status === EditorStatus.EDITING) {
            let evening = eveningStore.getEvening().getPayload();
            if(evening) {
                return findByUuid(evening.get('diningTables'), this.diningTable);
            }
        } else if (this.status === EditorStatus.CREATING) {
            return this.diningTable;
        }
        return null;
    }
}

const diningTablesEditingStore = new DiningTableEditorStore();
export default diningTablesEditingStore;