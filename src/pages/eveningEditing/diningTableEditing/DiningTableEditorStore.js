import {EntitiesUtils} from "../../../utils/EntitiesUtils";
import OrdinationsEditorActions from "./ordinationsEditing/OrdinationsEditorActions";
import EveningEditorActions from "../EveningEditorActions";
import DiningTablesClosingActions from "./tableClosingFeature/DiningTablesClosingActions";
import AbstractStore from "../../../stores/AbstractStore";
import DiningTablesEditorActions from "./DiningTablesEditorActions";
import dataStore from "../../../stores/DataStore";
import DiningTable from "../../../model/DiningTable";
import EveningSelectorActions from "../eveningSelection/EveningSelectorActions";
import CRUDStatus from "../../../utils/CRUDStatus";
import {BillType} from "../../../model/Bill";
import {DataActions, DataActionTypes} from "../../../actions/DataActions";

export const DiningTableEditorTabs = {
    ORDINATIONS: "ORDINATIONS",
    REVIEW: "REVIEW",
    BILLS: "BILLS",
};

const EVT_DINING_TABLES_CHANGED = "EVT_DINING_TABLES_CHANGED";

class DiningTableEditorStore extends AbstractStore {
    constructor() {
        super("diningTableEditing", EVT_DINING_TABLES_CHANGED, dataStore);
        this.page = 0;

        this.currentTable = null;
        this.crudStatus = CRUDStatus.RETRIEVE;
        this.tab = DiningTableEditorTabs.ORDINATIONS;
        this.scrollReview = 0;
        this.advanced = false;
        this.merging = false;
        this.mergeTarget = null;

        this.billWizard = DiningTableEditorStore.initBillWizard(false);
    }

    static initBillWizard(visible) {
        return {
            page: 0,
            visible: visible,

            orders: [],
            quick: true,
            split: 1,
            finalTotal: 0,
            type: BillType.RECEIPT,
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
            scrollReview: this.scrollReview,
            page: this.page,
            currentTable: this.currentTable,
            crudStatus: this.crudStatus,
            billWizard: this.billWizard,
            tab: this.tab,
            advanced: this.advanced,

            merging: this.merging,
            mergeTarget: this.mergeTarget
        };
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[DiningTablesEditorActions.SELECT_PAGE] = (page) => this.page = page;
        this.addCRUDHandlers(handlers);
        handlers[DiningTablesEditorActions.SELECT_DINING_TABLE_TAB] = (tab) => this.tab = tab;


        handlers[OrdinationsEditorActions.CRUD.CREATE] = () => {
            this.tab = DiningTableEditorTabs.ORDINATIONS;
            this.scrollReview = 1;
        };

        handlers[OrdinationsEditorActions.CRUD.DELETE] = () => {
            if(this.currentTable) {
                this.currentTable = dataStore.getEntity(this.currentTable.uuid);
            }
        };

        AbstractStore.assign(handlers,
            [EveningEditorActions.GET_SELECTED,
                EveningEditorActions.DESELECT_EVENING,
                EveningEditorActions.SHOW_EVENING_REVIEW,
                EveningSelectorActions.CHOOSE],
            () => {
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.currentTable = null;
        });

        return handlers;
    }

    addCRUDHandlers(handlers){

        handlers[DiningTablesEditorActions.CRUD.BEGIN_CREATION] = () => {
            this.currentTable = new DiningTable(EntitiesUtils.newDiningTable(), dataStore.getPool());
            this.crudStatus = CRUDStatus.CREATE;
        };

        handlers[DiningTablesEditorActions.CRUD.UPDATE.LOCAL.CCS] = ccs => this.currentTable.coverCharges = ccs;
        handlers[DiningTablesEditorActions.CRUD.UPDATE.LOCAL.WAITER] = w => this.currentTable.waiter = w;
        handlers[DiningTablesEditorActions.CRUD.UPDATE.LOCAL.TABLE] = t => this.currentTable.table = t;

        AbstractStore.assign(handlers, [
            DiningTablesEditorActions.CRUD.UPDATE.REMOTE.CCS,
            DiningTablesEditorActions.CRUD.UPDATE.REMOTE.WAITER,
            DiningTablesEditorActions.CRUD.UPDATE.REMOTE.TABLE
        ], (table) => this.currentTable = dataStore.getEntity(table.uuid));

        handlers[DiningTablesEditorActions.CRUD.ABORT_CREATION] = () => {
            this.currentTable = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[DiningTablesEditorActions.CRUD.CREATE] = (table) => {
            this.currentTable = dataStore.getEntity(table.uuid);
            this.crudStatus = CRUDStatus.UPDATE;
            this.advanced = false;
            this.tab = DiningTableEditorTabs.REVIEW;
        };

        handlers[DiningTablesEditorActions.CRUD.SELECT] = (table) => {
            this.currentTable = table;
            this.crudStatus = CRUDStatus.UPDATE;
            this.advanced = false;
            this.tab = DiningTableEditorTabs.REVIEW;
        };

        handlers[DiningTablesEditorActions.CRUD.DESELECT] = () => {
            this.currentTable = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[DiningTablesEditorActions.CRUD.BEGIN_DELETION] = () => {
            this.crudStatus = CRUDStatus.DELETE;
        };

        handlers[DiningTablesEditorActions.CRUD.ABORT_DELETION] = () => {
            this.crudStatus = CRUDStatus.UPDATE;
        };

        handlers[DiningTablesEditorActions.CRUD.DELETE] = () => {
            this.currentTable = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
        };


        handlers[DiningTablesClosingActions.QUICK_BILL] = (bill) => {
            this.tab = DiningTableEditorTabs.BILLS;
            this.refreshTable();
        };

        handlers[DiningTablesClosingActions.CRUD.CREATE] = (bill) => {
            this.tab = DiningTableEditorTabs.BILLS;
            this.refreshTable();
        };

        handlers[DataActionTypes.LOAD_DINING_TABLES] = () => {
            this.refreshTable();
        };

        handlers[DiningTablesClosingActions.CRUD.DELETE] = () => {
            this.refreshTable();
        };

        handlers[DiningTablesClosingActions.PRINT_BILL] = () => {
            this.refreshTable();
        };

        handlers[DiningTablesEditorActions.SHOW_ADVANCED] = () => this.advanced = true;
        handlers[DiningTablesEditorActions.HIDE_ADVANCED] = () => this.advanced = false;

        handlers[DiningTablesEditorActions.MERGE.BEGIN] = () => this.merging = true;
        handlers[DiningTablesEditorActions.MERGE.SELECT_TARGET] = (target) => this.mergeTarget = target;
        handlers[DiningTablesEditorActions.MERGE.ABORT] = () => {
            this.merging = false;
            this.mergeTarget = false;
        };

        handlers[DiningTablesEditorActions.MERGE.CONFIRM] = (mergedTable, oldTable) => {
            this.currentTable = dataStore.getEntity(mergedTable.uuid);
            this.crudStatus = CRUDStatus.UPDATE;
            this.tab = DiningTableEditorTabs.REVIEW;
            this.merging = false;
            this.mergeTarget = null;
        };

        handlers[DiningTablesClosingActions.LOCK_TABLE] = () => {
            this.currentTable = null;
            this.crudStatus = CRUDStatus.RETRIEVE;
            this.tab = DiningTableEditorTabs.REVIEW;
        }
    }

    refreshTable(){
        if(this.currentTable) {
            this.currentTable = dataStore.getEntity(this.currentTable.uuid);
        }
    }

}

const diningTableEditingStore = new DiningTableEditorStore();
export default diningTableEditingStore;