import SubFeatureStore from "../../../stores/SubFeatureStore";
import eveningPageStore from "../EveningPageStore";
import StoresUtils, {EditorStatus} from "../../StoresUtils";
import eveningStore from "../../../stores/EveningStore";
import {findByUuid, iSet} from "../../../utils/Utils";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {ACT_DELETE_DINING_TABLE} from "../../../actions/ActionTypes";
import {OrdinationEditorActionTypes} from "./ordinationsEditing/OrdinationsEditorActions";
import {RECEIPT} from "./diningTableClosing/DiningTableClosingView";
import {EveningEditingActionTypes} from "../EveningEditorActions";
import {DiningTablesEditorActionTypes} from "./DiningTablesEditorActions";

const {Map, fromJS} = require('immutable');

export const DiningTableEditorMode = {
    ORDINATIONS: "ORDINATIONS",
    DATA: "DATA",
    BILLS: "BILLS"
};

class DiningTableEditorStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "diningTablesEditing");
        this.page = 0;
        this.status = EditorStatus.SURFING;
        this.editorMode = DiningTableEditorMode.ORDINATIONS;

        this.deletingDiningTable = false;
        this.diningTable = null;

        this.billWizard = this.initBillWizard(false);
    }

    resetDiningTableEditor() {
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
            deletingDiningTable: this.deletingDiningTable,
            mergeEditor: this.mergeEditor,
            editorMode: this.editorMode,
            billWizard: this.billWizard,
            diningTable: this.getSelectedDiningTable()
        })
    }

    getActions() {
        return Object.values(DiningTablesEditorActionTypes);
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
            case DiningTablesEditorActionTypes.BEGIN_ORDINATIONS_EDITING:
                this.editorMode = DiningTableEditorMode.ORDINATIONS;
                break;
            case DiningTablesEditorActionTypes.BEGIN_DATA_EDITING:
                this.editorMode = DiningTableEditorMode.DATA;
                this.ccsEditor = StoresUtils.createIntEditor(oldCcs);
                this.waiterEditor = StoresUtils.createSelectEditor(oldWaiter);
                this.tableEditor = StoresUtils.createSelectEditor(oldTable);
                break;
            case DiningTablesEditorActionTypes.BEGIN_BILLS_EDITING:
                this.editorMode = DiningTableEditorMode.BILLS;
                break;
            case OrdinationEditorActionTypes.ABORT_ORDINATION_EDITING:
                this.editingData = false;
                this.editingBills = false;
                break;
            case DiningTablesEditorActionTypes.SELECT_DINING_TABLE:
                this.diningTable = action.body;
                this.status = EditorStatus.EDITING;
                this.editingData = false;
                this.editingBills = false;
                break;
            case DiningTablesEditorActionTypes.SELECT_DINING_TABLE_PAGE:
                this.page = action.body;
                break;
            case DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_DELETION:
                this.deletingDiningTable = true;
                break;
            case DiningTablesEditorActionTypes.ABORT_DINING_TABLE_DELETION:
                this.deletingDiningTable = false;
                break;
            case EveningEditingActionTypes.DESELECT:
            case DiningTablesEditorActionTypes.DELETE_DINING_TABLE:
            case DiningTablesEditorActionTypes.DESELECT_DINING_TABLE:
                this.deletingDiningTable = false;
                this.diningTable = null;
                this.status = EditorStatus.SURFING;
                break;
            case DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_CREATION:
                this.resetDiningTableEditor();
                this.diningTable = EntitiesUtils.newDiningTable();
                this.status = EditorStatus.CREATING;
                break;
            case DiningTablesEditorActionTypes.CREATE_DINING_TABLE:
                this.resetDiningTableEditor();
                this.diningTable = action.body.get('uuid');
                this.status = EditorStatus.EDITING;
                this.editingData = false;
                this.editingBills = false;
                break;
            //CoverCharges
            case DiningTablesEditorActionTypes.BEGIN_CCS_EDITING:
                this.ccsEditor = StoresUtils.initIntEditor(oldCcs);
                break;
            case DiningTablesEditorActionTypes.CCS_CHANGE:
                this.ccsEditor = iSet(this.ccsEditor, "text", action.body);
                break;
            case DiningTablesEditorActionTypes.CCS_CHAR:
                this.ccsEditor = StoresUtils.intChar(this.ccsEditor, action.body);
                break;
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_CCS:
                this.diningTable = this.diningTable.set('coverCharges', action.body);
                this.ccsEditor = StoresUtils.createIntEditor(this.diningTable.get('coverCharges'));
                break;
            case DiningTablesEditorActionTypes.CONFIRM_CCS:
            case DiningTablesEditorActionTypes.ABORT_CCS:
                this.ccsEditor = StoresUtils.createIntEditor(oldCcs);
                break;
            //Waiter
            case DiningTablesEditorActionTypes.BEGIN_WAITER_EDITING:
                this.waiterEditor = StoresUtils.initSelectEditor(oldWaiter);
                break;
            case DiningTablesEditorActionTypes.SELECT_WAITER:
                this.waiterEditor = iSet(this.waiterEditor, "value", action.body);
                break;
            case DiningTablesEditorActionTypes.SELECT_WAITER_PAGE:
                this.waiterEditor = iSet(this.waiterEditor, "page", action.body);
                break;
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_WAITER:
                this.diningTable = this.diningTable.set('waiter', action.body);
                this.waiterEditor = StoresUtils.createSelectEditor(this.diningTable.get('waiter'));
                break;
            case DiningTablesEditorActionTypes.CONFIRM_WAITER:
            case DiningTablesEditorActionTypes.ABORT_WAITER:
                this.waiterEditor = StoresUtils.createSelectEditor(oldWaiter);
                break;
            //Table
            case DiningTablesEditorActionTypes.BEGIN_TABLE_EDITING:
                this.tableEditor = StoresUtils.initSelectEditor(oldTable);
                break;
            case DiningTablesEditorActionTypes.SELECT_TABLE:
                this.tableEditor = iSet(this.tableEditor, "value", action.body);
                break;
            case DiningTablesEditorActionTypes.SELECT_TABLE_PAGE:
                this.tableEditor = iSet(this.tableEditor, "page", action.body);
                break;
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_TABLE:
                this.diningTable = this.diningTable.set('table', action.body);
                this.tableEditor = StoresUtils.createSelectEditor(this.diningTable.get('table'));
                break;
            case DiningTablesEditorActionTypes.CONFIRM_TABLE:
            case DiningTablesEditorActionTypes.ABORT_TABLE:
                this.tableEditor = StoresUtils.createSelectEditor(oldTable);
                break;


            case DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_MERGE:
                this.mergeEditor = StoresUtils.initSelectEditor();
                break;
            case DiningTablesEditorActionTypes.SELECT_MERGE_TARGET:
                this.mergeEditor = iSet(this.mergeEditor, "value", action.body);
                break;
            case DiningTablesEditorActionTypes.SELECT_MERGE_PAGE:
                this.mergeEditor = iSet(this.mergeEditor, "page", action.body);
                break;
            case DiningTablesEditorActionTypes.MERGE_DINING_TABLE:
                this.mergeEditor = StoresUtils.createSelectEditor();
                this.diningTable = null;
                this.status = EditorStatus.SURFING;
                break;
            case DiningTablesEditorActionTypes.ABORT_DINING_TABLE_MERGE:
                this.mergeEditor = StoresUtils.createSelectEditor();
                break;
            //CLOSING
            case DiningTablesEditorActionTypes.BEGIN_CLOSING:
                this.billWizard = this.initBillWizard(true);
                break;
            case DiningTablesEditorActionTypes.ABORT_CLOSING:
                this.billWizard = this.initBillWizard(false);
                break;
            case DiningTablesEditorActionTypes.CONFIRM_CLOSING:
                this.billWizard = this.initBillWizard(false);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    initBillWizard(visible) {
        return Map({
            page: 0,
            visible: visible,

            orders: [],
            quick: true,
            split: 1,
            finalTotal: 0,
            type: RECEIPT,
            percent: 0,
            coverCharges: 0,
            customer: null
        });
    }

    getSelectedDiningTable() {
        if (this.status === EditorStatus.EDITING) {
            let evening = eveningStore.getEvening().getPayload();
            if (evening) {
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