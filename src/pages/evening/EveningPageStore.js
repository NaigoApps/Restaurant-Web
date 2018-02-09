import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_ABORT_DINING_TABLE_DATA_EDITING,
    ACT_ABORT_ENTITY_EDITING,
    ACT_ASK_SELECTED_EVENING,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_BEGIN_DINING_TABLE_DATA_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_CLOSE_ORDERS,
    ACT_CREATE_BILL,
    ACT_CREATE_DINING_TABLE,
    ACT_CREATE_ORDINATION,
    ACT_DELETE_BILL,
    ACT_DELETE_DINING_TABLE,
    ACT_DESELECT_BILL,
    ACT_OPEN_ORDERS,
    ACT_PRINT_ORDINATION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_BILL,
    ACT_SELECT_EVENING,
    ACT_SET_ENTITY_PROPERTY,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_ENTITY,
    ACT_UPDATE_ENTITY_PROPERTY,
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
import phasesStore from "../../stores/PhasesStore";
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";
import DiningTablesUtils from "./tables/DiningTablesUtils";
import {findByUuid} from "../../utils/Utils";
import entityEditorStore, {
    DINING_TABLE_TYPE,
    EVENING_TYPE,
    ORDERS_TYPE,
    ORDINATION_TYPE
} from "../../stores/EntityEditorStore";

const {Map, fromJS} = require('immutable');

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

class EveningPageStore extends AbstractStore {

    constructor() {
        super(EVT_EVENING_PAGE_STORE_CHANGED);
        this.selectedOrder = null;
        this.currentInvoice = null;
        this.selectedBill = null;
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([
            entityEditorStore.getToken(),

            eveningSelectionFormStore.getToken(),
            eveningStore.getToken(),
            waitersStore.getToken(),
            tablesStore.getToken(),
            categoriesStore.getToken(),
            dishesStore.getToken(),
            phasesStore.getToken(),
            additionsStore.getToken()
        ]);

        let changed = AbstractEntityStore.areLoaded([waitersStore, tablesStore, categoriesStore, dishesStore, phasesStore, additionsStore, eveningStore]);

        switch (action.type) {
            case ACT_RETRIEVE_WAITERS:
            case ACT_RETRIEVE_RESTAURANT_TABLES:
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_PHASES:
            case ACT_RETRIEVE_ADDITIONS:
            case ACT_UPDATE_EVENING:
            case ACT_PRINT_ORDINATION:
            case ACT_CREATE_DINING_TABLE:
            case ACT_UPDATE_DINING_TABLE:

            case ACT_CREATE_ORDINATION:

            case ACT_BEGIN_ENTITY_EDITING:
            case ACT_SET_ENTITY_PROPERTY:
            case ACT_UPDATE_ENTITY_PROPERTY:
            case ACT_UPDATE_ENTITY:

            case ACT_UPDATE_ORDINATION:
                break;
            case ACT_ABORT_ENTITY_EDITING:
                if([EVENING_TYPE, DINING_TABLE_TYPE, ORDINATION_TYPE].includes(action.body)){
                    this.editingTableData = false;
                }
                break;

            case ACT_ASK_SELECTED_EVENING:
            case ACT_SELECT_EVENING:
            case ACT_DELETE_DINING_TABLE:
            case ACT_ABORT_DINING_TABLE_DATA_EDITING:
                this.editingTableData = false;
                break;

            case ACT_BEGIN_DINING_TABLE_DATA_EDITING:
                this.editingTableData = true;
                break;

            case ACT_BEGIN_DINING_TABLE_CLOSING:
                this.currentInvoice = fromJS({
                    orders: []
                });
                break;
            case ACT_CREATE_BILL:
                this.currentInvoice = null;
                break;
            case ACT_SELECT_BILL:
                this.selectedBill = action.body;
                break;
            case ACT_DELETE_BILL:
            case ACT_DESELECT_BILL:
                this.selectedBill = null;
                break;
            case ACT_CLOSE_ORDERS:
                this.closeOrders(action.body.order, action.body.quantity);
                break;
            case ACT_OPEN_ORDERS:
                this.openOrders(action.body.order, action.body.quantity);
                break;
            case ACT_ABORT_DINING_TABLE_CLOSING:
                this.currentInvoice = null;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    closeOrders(sample, n) {
        let evening = eveningStore.getEvening().getPayload();
        let table = findByUuid(evening.diningTables, this.selectedDiningTable);
        let openedOrders = DiningTablesUtils.findTableOpenedOrders(table);
        openedOrders = openedOrders.filter(order => !this.currentInvoice.orders.includes(order.uuid));
        for (let i = 0; i < openedOrders.length; i++) {
            if (n > 0 && DiningTablesUtils.sameOrder(openedOrders[i], sample)) {
                this.currentInvoice.orders.push(openedOrders[i].uuid);
                n--;
            }
        }
    }

    openOrders(sample, n) {
        let invoice = this.currentInvoice;
        if (invoice) {
            for (let i = 0; i < n; i++) {
                let index = invoice.orders.findIndex(order => DiningTablesUtils.sameOrder(order, sample));
                invoice.orders.splice(index, 1);
            }
        }
    }

    buildOrder() {
        return fromJS({
            ordination: this.selectedOrdination,
            dish: "",
            price: 0.0,
            notes: ""
        });
    }

    getState() {
        let result = Map({
            date: eveningSelectionFormStore.getDate(),

            evening: entityEditorStore.find(EVENING_TYPE),

            currentInvoice: this.currentInvoice,
            selectedBill: this.selectedBill,

            editingTable: entityEditorStore.find(DINING_TABLE_TYPE),
            editingTableData: this.editingTableData,
            editingOrdination: entityEditorStore.find(ORDINATION_TYPE),
            editingOrders: entityEditorStore.find(ORDERS_TYPE),

            selectedOrder: this.selectedOrder,
            createdOrder: this.createdOrder,

            waiters: waitersStore.getWaiters().getPayload(),
            tables: tablesStore.getAllTables().getPayload(),
            categories: categoriesStore.getCategories().getPayload(),
            dishes: dishesStore.getDishes().getPayload(),
            phases: phasesStore.getPhases().getPayload(),
            additions: additionsStore.getAdditions().getPayload(),
        });
        return {
            data: result
        };
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;