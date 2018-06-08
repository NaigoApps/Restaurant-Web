import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_ABORT_DINING_TABLE_BILLS_EDITING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_BEGIN_DINING_TABLE_BILLS_EDITING,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_CREATE_ORDINATION,
    ACT_DELETE_BILL,
    ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_BILL,
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_CUSTOMERS,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_BILL,
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
import StoresUtils from "../StoresUtils";
import RootFeatureStore from "../../stores/RootFeatureStore";
import {EveningEditingActionTypes} from "./EveningEditorActions";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {Map, fromJS} = require('immutable');

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

class EveningPageStore extends RootFeatureStore {

    constructor() {
        super(EVT_EVENING_PAGE_STORE_CHANGED);
        this.state = Map();
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
            customersStore.getToken(),
            applicationStore.getToken()
        ]);

        let changed = true;

        let currentEvening = eveningStore.getEvening().getPayload();

        let state = this.state;

        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_WAITERS:
            case ACT_RETRIEVE_RESTAURANT_TABLES:
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_PHASES:
            case ACT_RETRIEVE_ADDITIONS:
            case ACT_RETRIEVE_CUSTOMERS:

            case ACT_CREATE_ORDINATION:

            case ACT_UPDATE_ORDINATION:
                break;

            // case ACT_ASK_SELECTED_EVENING:
            // case ACT_SELECT_EVENING:
            case ACT_DELETE_DINING_TABLE:
                this.editingTableBills = false;
                this.editingTableData = false;
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
                this.bill = action.body;
                break;
            case ACT_DELETE_BILL:
            case ACT_DESELECT_BILL:
                this.bill = null;
                break;
            default:
                changed = false;
                break;
        }

        if(Object.values(EveningEditingActionTypes).includes(action.type)){
            changed = true;
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
        let result = this.state;
        let evening = eveningStore.getEvening().getPayload();
        result = iSet(result, "evening", evening);

        result = iSet(result, "waiters", waitersStore.getWaiters().getPayload());
        result = iSet(result, "tables", tablesStore.getAllTables().getPayload());
        result = iSet(result, "categories", categoriesStore.getCategories().getPayload());
        result = iSet(result, "dishes", dishesStore.getDishes().getPayload());
        result = iSet(result, "phases", phasesStore.getPhases().getPayload());
        result = iSet(result, "additions", additionsStore.getAdditions().getPayload());
        result = iSet(result, "customers", customersStore.getCustomers().getPayload());

        result = iSet(result, 'settings', applicationStore.getSettings());

        return result;
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;