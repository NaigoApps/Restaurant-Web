import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_ABORT_DINING_TABLE_BILLS_EDITING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_ABORT_ENTITY_EDITING,
    ACT_ASK_SELECTED_EVENING,
    ACT_BEGIN_DINING_TABLE_BILLS_EDITING, ACT_BEGIN_DINING_TABLE_CREATION,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CREATE_DINING_TABLE,
    ACT_CREATE_ORDINATION,
    ACT_DELETE_BILL,
    ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_BILL,
    ACT_DESELECT_DINING_TABLE,
    ACT_PRINT_ORDINATION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_CUSTOMERS,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_BILL,
    ACT_SELECT_DINING_TABLE,
    ACT_SELECT_EVENING,
    ACT_SET_ENTITY_PROPERTY,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_ENTITY,
    ACT_UPDATE_EVENING,
    ACT_UPDATE_ORDINATION
} from "../../actions/ActionTypes";
import additionsStore from "../../stores/generic/AdditionsStore";
import eveningStore from "../../stores/EveningStore";
import eveningSelectionFormStore from "../../stores/EveningSelectionFormStore";
import waitersStore from "../../stores/generic/WaitersStore";
import tablesStore from "../../stores/generic/TablesStore";
import categoriesStore from "../../stores/generic/CategoriesStore";
import dishesStore from "../../stores/generic/DishesStore";
import phasesStore from "../../stores/generic/PhasesStore";
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";
import {findByUuid, iGet, iSet} from "../../utils/Utils";
import entityEditorStore, {
    CREATING_MODE,
    DINING_TABLE_TYPE,
    EDITING_MODE,
    EVENING_TYPE,
    ORDERS_TYPE,
    ORDINATION_TYPE
} from "../../stores/EntityEditorStore";
import WizardStore from "../../components/widgets/wizard/WizardStore";
import customersStore from "../../stores/generic/CustomersStore";
import {
    ACT_EVENING_EDITOR_CC_ABORT,
    ACT_EVENING_EDITOR_CC_CHAR,
    ACT_EVENING_EDITOR_CC_CONFIRM,
    ACT_EVENING_EDITOR_CC_START
} from "./EveningEditorActionTypes";
import StoresUtils, {EditorStatus} from "../StoresUtils";
import {DINING_TABLE_COVER_CHARGES_EDITOR, EVENING_COVER_CHARGE_EDITOR} from "./Topics";
import {
    ACT_DINING_TABLE_CREATOR_CCS_CONFIRM,
    ACT_DINING_TABLE_EDITOR_CCS_ABORT,
    ACT_DINING_TABLE_EDITOR_CCS_CHAR,
    ACT_DINING_TABLE_EDITOR_CCS_CONFIRM,
    ACT_DINING_TABLE_EDITOR_CCS_START
} from "./tables/DiningTableActionTypes";
import {EntitiesUtils} from "../../utils/EntitiesUtils";

const {Map, fromJS} = require('immutable');

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

class EveningPageStore extends WizardStore {

    constructor() {
        super(EVT_EVENING_PAGE_STORE_CHANGED);
        this.state = Map({
            selectedOrder: null,
            selectedBill: null,
            selectedDiningTable: null,
            ccEditor: StoresUtils.createFloatEditor(),
            diningTableEditor: EveningPageStore.resetDiningTableEditor()
        });
    }

    static resetDiningTableEditor() {
        return Map({
            editorStatus: EditorStatus.SURFING,
            ccs: StoresUtils.createIntEditor(),
            waiter: StoresUtils.createSelectEditor(),
            table: StoresUtils.createSelectEditor()
        });
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([
            entityEditorStore.getToken(),

            eveningStore.getToken(),
            waitersStore.getToken(),
            tablesStore.getToken(),
            categoriesStore.getToken(),
            dishesStore.getToken(),
            phasesStore.getToken(),
            additionsStore.getToken(),
            customersStore.getToken()
        ]);

        let changed = true;

        let currentEvening = eveningStore.getEvening().getPayload();

        let state = this.state;

        switch (action.type) {
            case ACT_RETRIEVE_WAITERS:
            case ACT_RETRIEVE_RESTAURANT_TABLES:
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_PHASES:
            case ACT_RETRIEVE_ADDITIONS:
            case ACT_RETRIEVE_CUSTOMERS:
            case ACT_UPDATE_EVENING:
            case ACT_PRINT_ORDINATION:
            case ACT_CREATE_DINING_TABLE:
            case ACT_UPDATE_DINING_TABLE:

            case ACT_CREATE_ORDINATION:

            case ACT_BEGIN_ENTITY_EDITING:
            case ACT_UPDATE_ENTITY:
            case ACT_SET_ENTITY_PROPERTY:
            case ACT_UPDATE_ORDINATION:
                break;
            case ACT_ABORT_ENTITY_EDITING:
                if ([EVENING_TYPE, DINING_TABLE_TYPE, ORDINATION_TYPE].includes(action.body)) {
                    this.editingTableData = false;
                    this.editingTableBills = false;
                }
                break;

            case ACT_BEGIN_DINING_TABLE_CREATION:
                this.state = iSet(this.state, "diningTableEditor", this.resetDiningTableEditor());
                this.state = iSet(this.state, "selectedDiningTable", EntitiesUtils.newDiningTable());
                break;
            case ACT_SELECT_DINING_TABLE:
                this.state = iSet(this.state, "selectedDiningTable", action.body);
                break;
            case ACT_DESELECT_DINING_TABLE:
                this.state = iSet(this.state, "selectedDiningTable", null);
                break;


            case ACT_ASK_SELECTED_EVENING:
            case ACT_SELECT_EVENING:
            case ACT_DELETE_DINING_TABLE:
                this.editingTableBills = false;
                this.editingTableData = false;
                this.state = iSet(this.state, "ccEditor", StoresUtils.createFloatEditor(currentEvening.get('coverCharge')));
                break;
            case ACT_ABORT_DINING_TABLE_DATA_EDITING:
                this.editingTableData = false;
                break;

            case ACT_BEGIN_DINING_TABLE_DATA_EDITING:
                this.editingTableData = true;
                break;
            case ACT_ABORT_DINING_TABLE_BILLS_EDITING:
                this.editingTableBills = false;
                break;

            case ACT_BEGIN_DINING_TABLE_BILLS_EDITING:
                this.editingTableBills = true;
                break;

            case ACT_SELECT_BILL:
                this.selectedBill = action.body;
                break;
            case ACT_DELETE_BILL:
            case ACT_DESELECT_BILL:
                this.selectedBill = null;
                break;
            default:
                changed = false;
                break;
        }

        if (action.topics.includes(EVENING_COVER_CHARGE_EDITOR)) {
            changed = this.handleCoverChargeAction(action);
        }
        if (action.topics.includes(DINING_TABLE_COVER_CHARGES_EDITOR)) {
            changed = this.handleCoverChargesAction(action);
        }

        changed &= AbstractEntityStore.areLoaded([waitersStore, tablesStore, categoriesStore, dishesStore,
            phasesStore, additionsStore, eveningStore, customersStore]);

        return changed;
    }

    getSelectedDiningTable() {
        let dtEditorState = iGet(this.state, "diningTableEditorStatus");
        if (dtEditorState === EDITING_MODE) {
            return findByUuid(eveningStore.getEvening().getPayload().get('tables'), iGet(this.state, "selectedDiningTable"));
        } else if (dtEditorState === CREATING_MODE) {
            return iGet(this.state, "selectedDiningTable")
        }
        return null;
    }

    getEveningTables() {
        return this.getCurrentEvening().get('tables');
    }

    getCurrentEvening() {
        return eveningStore.getEvening().getPayload();
    }

    handleCoverChargeAction(action) {
        let changed = true;
        let currentEvening = eveningStore.getEvening().getPayload();
        switch (action.type) {
            case ACT_EVENING_EDITOR_CC_START:
                this.state = iSet(this.state, "ccEditor", StoresUtils.initFloatEditor(currentEvening.get('coverCharge')));
                break;
            case ACT_EVENING_EDITOR_CC_CHAR:
                this.state = iSet(this.state, "ccEditor", StoresUtils.floatChar(this.state.get('ccEditor'), action.body));
                break;
            case ACT_EVENING_EDITOR_CC_CONFIRM:
                this.state = iSet(this.state, "ccEditor", StoresUtils.createFloatEditor(currentEvening.get('coverCharge')));
                break;
            case ACT_EVENING_EDITOR_CC_ABORT:
                this.state = iSet(this.state, "ccEditor", StoresUtils.createFloatEditor(currentEvening.get('coverCharge')));
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCoverChargesAction(action) {
        let changed = true;
        let editorName = "tableEditor.ccsEditor";
        let editor = iGet(this.state, editorName);
        let oldValue = this.getSelectedDiningTable().get('coverCharges');
        switch (action.type) {
            case ACT_DINING_TABLE_EDITOR_CCS_START:
                this.state = iSet(this.state, editorName, StoresUtils.initIntEditor(oldValue));
                break;
            case ACT_DINING_TABLE_EDITOR_CCS_CHAR:
                this.state = iSet(this.state, editorName, StoresUtils.intChar(editor, action.body));
                break;
            case ACT_DINING_TABLE_CREATOR_CCS_CONFIRM:
                this.state = iSet(this.state, "selectedDiningTable.coverCharges", action.body);
                this.state = iSet(this.state, editorName, action.body);
                break;
            case ACT_DINING_TABLE_EDITOR_CCS_CONFIRM:
                this.state = iSet(this.state, editorName, StoresUtils.createIntEditor(oldValue));
                break;
            case ACT_DINING_TABLE_EDITOR_CCS_ABORT:
                this.state = iSet(this.state, editorName, StoresUtils.createIntEditor(oldValue));
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        let evening = eveningStore.getEvening().getPayload();
        let table = null;
        if (evening) {
            if (entityEditorStore.isEditing(DINING_TABLE_TYPE)) {
                table = findByUuid(evening.get('diningTables'), entityEditorStore.find(DINING_TABLE_TYPE));
            } else if (entityEditorStore.isCreating(DINING_TABLE_TYPE)) {
                table = entityEditorStore.find(DINING_TABLE_TYPE);
            }
        }
        let ordination = null;
        if (table) {
            if (entityEditorStore.isEditing(ORDINATION_TYPE)) {
                ordination = findByUuid(table.get('ordinations'), entityEditorStore.find(ORDINATION_TYPE));
            } else if (entityEditorStore.isCreating(ORDINATION_TYPE)) {
                ordination = entityEditorStore.find(ORDINATION_TYPE);
            }
        }
        let orders = null;
        if (ordination) {
            if (entityEditorStore.isEditing(ORDERS_TYPE)) {
                orders = entityEditorStore.find(ORDERS_TYPE);
            } else if (entityEditorStore.isCreating(ORDERS_TYPE)) {
                orders = entityEditorStore.find(ORDERS_TYPE);
            }
        }
        let result = this.state;
        result = iSet(result, "date", eveningSelectionFormStore.getState());
        result = iSet(result, "evening", evening);

        result = iSet(result, "waiters", waitersStore.getWaiters().getPayload());
        result = iSet(result, "tables", tablesStore.getAllTables().getPayload());
        result = iSet(result, "categories", categoriesStore.getCategories().getPayload());
        result = iSet(result, "dishes", dishesStore.getDishes().getPayload());
        result = iSet(result, "phases", phasesStore.getPhases().getPayload());
        result = iSet(result, "additions", additionsStore.getAdditions().getPayload());
        result = iSet(result, "customers", customersStore.getCustomers().getPayload());

        // let result = Map({
        //     editingTable: table,
        //     editingOrdination: ordination,
        //     editingOrders: orders,
        //
        //     selectedBill: this.selectedBill,
        //
        //     editingTableData: this.editingTableData,
        //     editingTableBills: this.editingTableBills,
        //
        //     selectedOrder: this.selectedOrder,
        //     createdOrder: this.createdOrder,
        //
        //
        // });
        return {
            data: result
        };
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;