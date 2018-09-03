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
    ACT_SELECT_BILL,
    ACT_UPDATE_ORDINATION,
    DataActionTypes
} from "../../actions/DataActions";
import eveningStore from "../../stores/EveningStore";
import {iSet} from "../../utils/Utils";
import RootFeatureStore from "../../stores/RootFeatureStore";
import {EveningEditingActionTypes} from "./EveningEditorActions";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";

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
            dataStore.getToken(),
            applicationStore.getToken()
        ]);

        let changed = true;

        let currentEvening = eveningStore.getEvening().getPayload();

        let state = this.state;

        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case DataActionTypes.LOAD_WAITERS:
            case DataActionTypes.LOAD_RESTAURANT_TABLES:
            case DataActionTypes.LOAD_CATEGORIES:
            case DataActionTypes.LOAD_DISHES:
            case DataActionTypes.LOAD_PHASES:
            case DataActionTypes.LOAD_ADDITIONS:
            case DataActionTypes.LOAD_CUSTOMERS:

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
//FIXME
        // changed &= AbstractEntityStore.areLoaded([waitersStore, tablesStore, categoriesStore, dishesStore,
        //     phasesStore, additionsStore, eveningStore, customersStore]);

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
// FIXME
        // result = iSet(result, "waiters", waitersStore.getWaiters().getPayload());
        // result = iSet(result, "tables", tablesStore.getAllTables().getPayload());
        // result = iSet(result, "categories", categoriesStore.getCategories().getPayload());
        // result = iSet(result, "dishes", dishesStore.getDishes().getPayload());
        // result = iSet(result, "phases", phasesStore.getPhases().getPayload());
        // result = iSet(result, "additions", additionsStore.getAdditions().getPayload());
        // result = iSet(result, "customers", customersStore.getCustomers().getPayload());

        result = iSet(result, 'settings', applicationStore.getSettings());

        return result;
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;