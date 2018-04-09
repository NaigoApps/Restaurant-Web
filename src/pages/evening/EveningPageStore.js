import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_ABORT_DINING_TABLE_BILLS_EDITING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_ASK_SELECTED_EVENING,
    ACT_BEGIN_DINING_TABLE_BILLS_EDITING,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_CREATE_ORDINATION,
    ACT_DELETE_BILL,
    ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_BILL,
    ACT_PRINT_ORDINATION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_CUSTOMERS,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_BILL,
    ACT_SELECT_EVENING,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_EVENING,
    ACT_UPDATE_ORDINATION
} from "../../actions/ActionTypes";
import additionsStore from "../../stores/generic/AdditionsStore";
import eveningStore from "../../stores/EveningStore";
import waitersStore from "../../stores/generic/WaitersStore";
import tablesStore from "../../stores/generic/TablesStore";
import categoriesStore from "../../stores/generic/CategoriesStore";
import dishesStore from "../../stores/generic/DishesStore";
import phasesStore from "../../stores/generic/PhasesStore";
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";
import {iSet} from "../../utils/Utils";
import customersStore from "../../stores/generic/CustomersStore";
import {
    ACT_EVENING_EDITOR_CC_ABORT,
    ACT_EVENING_EDITOR_CC_CHAR,
    ACT_EVENING_EDITOR_CC_CONFIRM,
    ACT_EVENING_EDITOR_CC_START
} from "./EveningEditorActionTypes";
import StoresUtils from "../StoresUtils";
import RootFeatureStore from "../../stores/RootFeatureStore";

const {Map, fromJS} = require('immutable');

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

class EveningPageStore extends RootFeatureStore {

    constructor() {
        super(EVT_EVENING_PAGE_STORE_CHANGED);
        this.state = Map({
            ccEditor: StoresUtils.createFloatEditor()
        });
    }


    handleCompletedAction(action) {
        //FIXME: Generic stores should be waited in RootFeatureStore
        dispatcher.waitFor([
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
            case ACT_UPDATE_DINING_TABLE:

            case ACT_CREATE_ORDINATION:

            case ACT_UPDATE_ORDINATION:
                break;

            case ACT_ASK_SELECTED_EVENING:
            case ACT_SELECT_EVENING:
            case ACT_DELETE_DINING_TABLE:
                this.editingTableBills = false;
                this.editingTableData = false;
                this.state = iSet(this.state, "ccEditor", StoresUtils.createFloatEditor(currentEvening.get('coverCharge')));
                break;

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

        changed &= AbstractEntityStore.areLoaded([waitersStore, tablesStore, categoriesStore, dishesStore,
            phasesStore, additionsStore, eveningStore, customersStore]);

        return changed;
    }

    getEveningTables() {
        return this.getCurrentEvening().get('tables');
    }

    getCurrentEvening() {
        return eveningStore.getEvening().getPayload();
    }

    buildState() {
        let evening = eveningStore.getEvening().getPayload();
        let table = null;
        let ordination = null;
        // if (evening) {
        //     if (entityEditorStore.isEditing(DINING_TABLE_TYPE)) {
        //         table = findByUuid(evening.get('diningTables'), entityEditorStore.find(DINING_TABLE_TYPE));
        //     } else if (entityEditorStore.isCreating(DINING_TABLE_TYPE)) {
        //         table = entityEditorStore.find(DINING_TABLE_TYPE);
        //     }
        // }
        // let ordination = null;
        // if (table) {
        //     if (entityEditorStore.isEditing(ORDINATION_TYPE)) {
        //         ordination = findByUuid(table.get('ordinations'), entityEditorStore.find(ORDINATION_TYPE));
        //     } else if (entityEditorStore.isCreating(ORDINATION_TYPE)) {
        //         ordination = entityEditorStore.find(ORDINATION_TYPE);
        //     }
        // }
        let orders = null;
        // if (ordination) {
        //     if (entityEditorStore.isEditing(ORDERS_TYPE)) {
        //         orders = entityEditorStore.find(ORDERS_TYPE);
        //     } else if (entityEditorStore.isCreating(ORDERS_TYPE)) {
        //         orders = entityEditorStore.find(ORDERS_TYPE);
        //     }
        // }
        let result = this.state;
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
        return result;
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;