import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import {OrdinationEditorActionTypes} from "./ordinationsEditing/OrdinationsEditorActions";
import {RECEIPT} from "./tableClosingFeature/DiningTableClosingWizard";
import EveningEditorActions from "../EveningEditorActions";
import {DiningTablesClosingActionTypes} from "./tableClosingFeature/DiningTablesClosingActions";
import EditorMode from "../../../utils/EditorMode";
import AbstractStore from "../../../stores/AbstractStore";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import StoresUtils from "../../StoresUtils";
import dataStore from "../../../stores/DataStore";
import DiningTable from "../../../model/DiningTable";
import EveningSelectorActions from "../eveningSelection/EveningSelectorActions";
import eveningPageStore from "../EveningPageStore";

const {Map} = require('immutable');

export const DiningTableEditorTabs = {
    ORDINATIONS: "ORDINATIONS",
    DATA: "DATA",
    BILLS: "BILLS",
};

const EVT_DINING_TABLES_CHANGED = "EVT_DINING_TABLES_CHANGED";

class DiningTableEditorStore extends AbstractStore {
    constructor() {
        super("diningTableEditing", EVT_DINING_TABLES_CHANGED, eveningPageStore);
        this.page = 0;
        this.editor = StoresUtils.initEditor();
        this.tab = DiningTableEditorTabs.ORDINATIONS;

        this.mergeEditor = DiningTableEditorStore.initMergeEditor();

        this.billWizard = DiningTableEditorStore.initBillWizard(false);
    }

    static initMergeEditor() {
        return {
            visible: false,
            target: null,
            page: 0
        };
    }

    static initBillWizard(visible) {
        return {
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
        };
    }

    getActionsClass() {
        return DiningTablesEditorActions;
    }

    buildState() {
        return {
            page: this.page,
            editor: this.editor,
            mergeEditor: this.mergeEditor,
            billWizard: this.billWizard,
            tab: this.tab
        };
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[DiningTablesEditorActions.BEGIN_DINING_TABLE_CREATION] = () => {
            this.editor = StoresUtils.initEditor(DiningTable.create(EntitiesUtils.newDiningTable(), dataStore.getPool()), true);
        };

        handlers[DiningTablesEditorActions.CONFIRM_DT_CREATOR_CCS] = ccs => this.editor.entity.coverCharges = ccs;
        handlers[DiningTablesEditorActions.CONFIRM_DT_CREATOR_WAITER] = w => this.editor.entity.waiter = w;
        handlers[DiningTablesEditorActions.CONFIRM_DT_CREATOR_TABLE] = tab => this.editor.entity.table = tab;

        handlers[DiningTablesEditorActions.CREATE_DINING_TABLE] = (table) => {
            this.editor = StoresUtils.initEditor(DiningTable.create(table, dataStore.getPool()));
            this.tab = DiningTableEditorTabs.ORDINATIONS;
        };

        handlers[DiningTablesEditorActions.SELECT_DINING_TABLE] = (table) => {
            this.editor = StoresUtils.initEditor(table);
            this.tab = DiningTableEditorTabs.ORDINATIONS;
        };

        handlers[DiningTablesEditorActions.SELECT_DINING_TABLE_TAB] = (tab) => this.tab = tab;

        AbstractStore.assign(handlers,
            [EveningEditorActions.GET_SELECTED,
                EveningEditorActions.DESELECT_EVENING,
                EveningEditorActions.SHOW_EVENING_REVIEW,
                EveningSelectorActions.CHOOSE],
            () => this.editor = StoresUtils.initEditor());

        return handlers;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case DiningTablesEditorActions.BEGIN_ORDINATIONS_EDITING:
                this.editorMode = DiningTableEditorTabs.ORDINATIONS;
                break;
            case DiningTablesEditorActions.BEGIN_DATA_EDITING:
                this.editorMode = DiningTableEditorTabs.DATA;
                break;
            case DiningTablesEditorActions.BEGIN_BILLS_EDITING:
                this.editorMode = DiningTableEditorTabs.BILLS;
                break;
            case OrdinationEditorActionTypes.ABORT_ORDINATION_EDITING:
                this.editingData = false;
                this.editingBills = false;
                break;
            case DiningTablesEditorActions.SELECT_DINING_TABLE_PAGE:
                this.page = action.body;
                break;
            case DiningTablesEditorActions.BEGIN_DINING_TABLE_DELETION:
                this.deletingDiningTable = true;
                break;
            case DiningTablesEditorActions.ABORT_DINING_TABLE_DELETION:
                this.deletingDiningTable = false;
                break;
            case DiningTablesEditorActions.DELETE_DINING_TABLE:
            case DiningTablesEditorActions.DESELECT_DINING_TABLE:
                this.deletingDiningTable = false;
                this.diningTable = null;
                this.status = EditorMode.SURFING;
                break;
            case DiningTablesEditorActions.BEGIN_MERGE:
                this.mergeEditor = DiningTableEditorStore.initMergeEditor();
                this.mergeEditor.visible = true;
                break;
            case DiningTablesEditorActions.SELECT_MERGE_PAGE:
                this.mergeEditor.page = action.body;
                break;
            case DiningTablesEditorActions.SELECT_MERGE_TARGET:
                this.mergeEditor.target = action.body;
                break;
            case DiningTablesEditorActions.ABORT_MERGE:
                this.mergeEditor = DiningTableEditorStore.initMergeEditor();
                break;
            case DiningTablesEditorActions.MERGE_DINING_TABLE:
                this.diningTable = this.mergeEditor.target;
                this.status = EditorMode.EDITING;
                this.mergeEditor = DiningTableEditorStore.initMergeEditor();
                break;
            //CLOSING
            case DiningTablesEditorActions.BEGIN_BILL_CREATION:
                this.billWizard = DiningTableEditorStore.initBillWizard(true);
                break;
            case DiningTablesEditorActions.ABORT_CLOSING:
                this.billWizard = DiningTableEditorStore.initBillWizard(false);
                break;
            case DiningTablesEditorActions.CONFIRM_CLOSING:
                this.billWizard = DiningTableEditorStore.initBillWizard(false);
                break;
            case DiningTablesClosingActionTypes.LOCK_TABLE:
                this.diningTable = null;
                this.status = EditorMode.SURFING;
                break;
            case DiningTablesClosingActionTypes.PRINT_BILL:
                const table = this.getSelectedDiningTable();
                if (table && table.status === 'CHIUSO') {
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


    getSelectedDiningTable() {
        if (this.status === EditorMode.EDITING) {
            // let evening = eveningStore.getEvening().getPayload();
            // if (evening) {
            //     return findByUuid(evening.get('diningTables'), this.diningTable);
            // }
        } else if (this.status === EditorMode.CREATING) {
            return this.diningTable;
        }
        return null;
    }
}

const diningTableEditingStore = new DiningTableEditorStore();
export default diningTableEditingStore;