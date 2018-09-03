import SubFeatureStore from "../../../stores/SubFeatureStore";
import eveningPageStore from "../EveningPageStore";
import eveningStore from "../../../stores/EveningStore";
import {findByUuid} from "../../../utils/Utils";
import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {OrdinationEditorActionTypes} from "./ordinationsEditing/OrdinationsEditorActions";
import {RECEIPT} from "./tableClosingFeature/DiningTableClosingWizard";
import {EveningEditingActionTypes} from "../EveningEditorActions";
import {DiningTablesEditorActionTypes} from "./DiningTablesEditorActions";
import {DiningTablesClosingActionTypes} from "./tableClosingFeature/DiningTablesClosingActions";
import EditorMode from "../../../utils/EditorMode";

const {Map} = require('immutable');

export const DiningTableEditorMode = {
    ORDINATIONS: "ORDINATIONS",
    DATA: "DATA",
    BILLS: "BILLS",
};

class DiningTableEditorStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "diningTableEditing");
        this.page = 0;
        this.status = EditorMode.SURFING;
        this.editorMode = DiningTableEditorMode.ORDINATIONS;

        this.mergeEditor = DiningTableEditorStore.initMergeEditor();

        this.deletingDiningTable = false;
        this.diningTable = null;

        this.billWizard = DiningTableEditorStore.initBillWizard(false);
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
        let changed = true;
        switch (action.type) {
            case DiningTablesEditorActionTypes.BEGIN_ORDINATIONS_EDITING:
                this.editorMode = DiningTableEditorMode.ORDINATIONS;
                break;
            case DiningTablesEditorActionTypes.BEGIN_DATA_EDITING:
                this.editorMode = DiningTableEditorMode.DATA;
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
                this.status = EditorMode.EDITING;
                this.editorMode = DiningTableEditorMode.ORDINATIONS;
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
                this.status = EditorMode.SURFING;
                break;
            case DiningTablesEditorActionTypes.BEGIN_DINING_TABLE_CREATION:
                this.diningTable = EntitiesUtils.newDiningTable();
                this.status = EditorMode.CREATING;
                break;
            case DiningTablesEditorActionTypes.CREATE_DINING_TABLE:
                this.diningTable = action.body.get('uuid');
                this.status = EditorMode.EDITING;
                this.editorMode = DiningTableEditorMode.ORDINATIONS;
                break;
            //CoverCharges
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_CCS:
                this.diningTable = this.diningTable.set('coverCharges', action.body);
                break;
            //Waiter
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_WAITER:
                this.diningTable = this.diningTable.set('waiter', action.body);
                break;
            //Table
            case DiningTablesEditorActionTypes.CONFIRM_CREATOR_TABLE:
                this.diningTable = this.diningTable.set('table', action.body);
                break;
            case DiningTablesEditorActionTypes.BEGIN_MERGE:
                this.mergeEditor = DiningTableEditorStore.initMergeEditor();
                this.mergeEditor = this.mergeEditor.set('visible', true);
                break;
            case DiningTablesEditorActionTypes.SELECT_MERGE_PAGE:
                this.mergeEditor = this.mergeEditor.set('page', action.body);
                break;
            case DiningTablesEditorActionTypes.SELECT_MERGE_TARGET:
                this.mergeEditor = this.mergeEditor.set('target', action.body);
                break;
            case DiningTablesEditorActionTypes.ABORT_MERGE:
                this.mergeEditor = DiningTableEditorStore.initMergeEditor();
                break;
            case DiningTablesEditorActionTypes.MERGE_DINING_TABLE:
                this.diningTable = this.mergeEditor.get('target');
                this.status = EditorMode.EDITING;
                this.mergeEditor = DiningTableEditorStore.initMergeEditor();
                break;
            //CLOSING
            case DiningTablesEditorActionTypes.BEGIN_BILL_CREATION:
                this.billWizard = DiningTableEditorStore.initBillWizard(true);
                break;
            case DiningTablesEditorActionTypes.ABORT_CLOSING:
                this.billWizard = DiningTableEditorStore.initBillWizard(false);
                break;
            case DiningTablesEditorActionTypes.CONFIRM_CLOSING:
                this.billWizard = DiningTableEditorStore.initBillWizard(false);
                break;
            case DiningTablesClosingActionTypes.LOCK_TABLE:
                this.diningTable = null;
                this.status = EditorMode.SURFING;
                break;
            case DiningTablesClosingActionTypes.PRINT_BILL:
                const table = this.getSelectedDiningTable();
                if(table && table.get('status') === 'CHIUSO'){
                    this.status = EditorMode.SURFING;
                    this.diningTable = null;
                }
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    static initMergeEditor(){
        return Map({
            visible: false,
            target: null,
            page: 0
        });
    }

    static initBillWizard(visible) {
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
        if (this.status === EditorMode.EDITING) {
            let evening = eveningStore.getEvening().getPayload();
            if (evening) {
                return findByUuid(evening.get('diningTables'), this.diningTable);
            }
        } else if (this.status === EditorMode.CREATING) {
            return this.diningTable;
        }
        return null;
    }
}

const diningTableEditingStore = new DiningTableEditorStore();
export default diningTableEditingStore;