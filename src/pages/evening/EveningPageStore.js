import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_ABORT_CREATE_ORDINATION,
    ACT_ABORT_DINING_TABLE_CLOSING,
    ACT_ABORT_EDIT_ORDINATION,
    ACT_ASK_SELECTED_EVENING,
    ACT_BEGIN_CREATE_DINING_TABLE,
    ACT_BEGIN_CREATE_ORDER,
    ACT_BEGIN_CREATE_ORDINATION,
    ACT_BEGIN_DINING_TABLE_CLOSING,
    ACT_BEGIN_EDIT_ORDINATION,
    ACT_CLOSE_ORDERS,
    ACT_CREATE_DINING_TABLE,
    ACT_CREATE_ORDER,
    ACT_CREATE_ORDINATION,
    ACT_DELETE_DINING_TABLE,
    ACT_DELETE_ORDER,
    ACT_DELETE_ORDINATION,
    ACT_DESELECT_DINING_TABLE,
    ACT_DESELECT_EVENING,
    ACT_DESELECT_ORDER,
    ACT_DESELECT_ORDINATION,
    ACT_EDIT_ORDINATION,
    ACT_OPEN_ORDERS,
    ACT_PRINT_ORDINATION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_DINING_TABLES,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_ORDERS,
    ACT_RETRIEVE_ORDINATIONS,
    ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_DINING_TABLE,
    ACT_SELECT_EVENING,
    ACT_SELECT_ORDER,
    ACT_SELECT_ORDINATION,
    ACT_UPDATE_DINING_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES,
    ACT_UPDATE_DINING_TABLE_CREATOR_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_WAITER,
    ACT_UPDATE_EVENING,
    ACT_UPDATE_ORDER,
    ACT_UPDATE_ORDER_DESCRIPTION,
    ACT_UPDATE_ORDER_DISH,
    ACT_UPDATE_ORDER_PHASE,
    ACT_UPDATE_ORDER_PRICE
} from "../../actions/ActionTypes";
import additionsStore from "../../stores/generic/AdditionsStore";
import eveningStore from "../../stores/EveningStore";
import eveningSelectionFormStore from "../../stores/EveningSelectionFormStore";
import waitersStore from "../../stores/generic/WaitersStore";
import tablesStore from "../../stores/generic/TablesStore";
import categoriesStore from "../../stores/generic/CategoriesStore";
import dishesStore from "../../stores/generic/DishesStore";
import phasesStore from "../../stores/PhasesStore";
import OrdinationsUtils from "./OrdinationsUtils";
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

class EveningPageStore extends AbstractStore {

    constructor() {
        super(EVT_EVENING_PAGE_STORE_CHANGED);
        this.selectedDiningTable = null;
        this.createdDiningTable = null;
        this.selectedOrdination = null;
        this.createdOrdination = null;
        this.editingOrdination = false;
        this.selectedOrder = null;
        this.createdOrder = null;
        this.currentInvoice = null;

        this.closingDiningTable = false;
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([
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
            case ACT_ASK_SELECTED_EVENING:
            case ACT_SELECT_EVENING:
            case ACT_UPDATE_EVENING:
            case ACT_PRINT_ORDINATION:
                break;
            case ACT_CREATE_DINING_TABLE:
                this.selectedDiningTable = action.body.uuid;
                this.createdDiningTable = null;
                break;
            case ACT_CREATE_ORDINATION:
                this.selectedOrdination = action.body.uuid;
                this.createdOrdination = null;
                break;
            case ACT_CREATE_ORDER:
                this.selectedOrder = action.body.uuid;
                this.createdOrder = null;
                break;
            case ACT_UPDATE_DINING_TABLE:
                this.selectedDiningTable = action.body.uuid;
                break;
            // case ACT_UPDATE_ORDINATION:
            //     this.selectedOrdination = action.body.uuid;
            //     break;
            case ACT_UPDATE_ORDER:
                this.selectedOrder = action.body.uuid;
                break;
            case ACT_DELETE_DINING_TABLE:
                this.selectedDiningTable = null;
                break;
            case ACT_DELETE_ORDINATION:
                this.selectedOrdination = null;
                break;
            case ACT_DELETE_ORDER:
                this.selectedOrder = null;
                break;
            case ACT_BEGIN_CREATE_DINING_TABLE:
                this.selectedDiningTable = null;
                this.createdDiningTable = this.buildDiningTable();
                break;
            case ACT_BEGIN_CREATE_ORDINATION:
                this.selectedOrdination = null;
                this.createdOrdination = this.buildOrdination();
                break;
            case ACT_ABORT_CREATE_ORDINATION:
                this.selectedOrdination = null;
                this.createdOrdination = null;
                break;
            case ACT_BEGIN_EDIT_ORDINATION:
                this.createdOrdination = null;
                this.editingOrdination = true;
                break;
            case ACT_ABORT_EDIT_ORDINATION:
                this.editingOrdination = false;
                break;
            case ACT_EDIT_ORDINATION:
                this.editingOrdination = false;
                break;
            case ACT_BEGIN_CREATE_ORDER:
                this.selectedOrder = null;
                this.createdOrder = this.buildOrder();
                break;
            case ACT_SELECT_DINING_TABLE:
                this.selectedDiningTable = action.body;
                this.createdDiningTable = null;
                break;
            case ACT_SELECT_ORDINATION:
                this.selectedOrdination = action.body;
                this.createdOrdination = null;
                break;
            case ACT_SELECT_ORDER:
                this.selectedOrder = action.body;
                this.createdOrder = null;
                break;
            case ACT_DESELECT_EVENING:
            case ACT_DESELECT_DINING_TABLE:
                this.selectedDiningTable = null;
                this.createdDiningTable = null;
                this.selectedOrdination = null;
                break;
            case ACT_DESELECT_ORDINATION:
                this.selectedOrdination = null;
                this.createdOrdination = null;
                break;
            case ACT_DESELECT_ORDER:
                this.selectedDiningTable = null;
                this.createdOrder = null;
                break;
            case ACT_UPDATE_DINING_TABLE_CREATOR_TABLE:
                this.setDiningTableTable(action.body);
                break;
            case ACT_UPDATE_DINING_TABLE_CREATOR_WAITER:
                this.setDiningTableWaiter(action.body);
                break;
            case ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES:
                this.setDiningTableCoverCharges(action.body);
                break;
            case ACT_BEGIN_DINING_TABLE_CLOSING:
                this.closingDiningTable = true;
                this.currentInvoice = {
                    orders: []
                };
                break;
            case ACT_CLOSE_ORDERS:
                this.closeOrders(action.body.order, action.body.quantity);
                break;
            case ACT_OPEN_ORDERS:
                this.openOrders(action.body.order, action.body.quantity);
                break;
            case ACT_ABORT_DINING_TABLE_CLOSING:
                this.closingDiningTable = false;
                this.currentInvoice = null;
                break;
            case ACT_UPDATE_ORDER_DISH:
                this.createdOrder.dish = action.body;
                break;
            case ACT_UPDATE_ORDER_PHASE:
                this.createdOrder.phase = action.body;
                break;
            case ACT_UPDATE_ORDER_DESCRIPTION:
                this.createdOrder.description = action.body;
                break;
            case ACT_UPDATE_ORDER_PRICE:
                this.createdOrder.price = action.body;
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    closeOrders(sample, n) {
        // let orders = eveningStore.getEvening().get.getOrders();
        // for(let i = 0;i < orders.length;i++){
        //     if(n > 0 && OrdinationsUtils.sameOrder(orders[i], sample)){
        //         this.currentInvoice.orders.push(orders[i]);
        //         n--;
        //     }
        // }
    }

    openOrders(sample, n) {
        let invoice = this.currentInvoice;
        if (invoice) {
            for (let i = 0; i < n; i++) {
                let index = invoice.orders.findIndex(order => OrdinationsUtils.sameOrder(order, sample));
                invoice.orders.splice(index, 1);
            }
        }
    }

    setDiningTableTable(table) {
        this.createdDiningTable.table = table;
    }

    setDiningTableWaiter(waiter) {
        this.createdDiningTable.waiter = waiter;
    }

    setDiningTableCoverCharges(cc) {
        this.createdDiningTable.coverCharges = cc;
    }

    buildDiningTable() {
        return {
            table: null,
            waiter: null,
            coverCharges: null
        };
    }

    buildOrdination() {
        return {
            table: this.selectedDiningTable
        };
    }

    buildOrder() {
        return {
            ordination: this.selectedOrdination,
            dish: "",
            price: 0.0,
            notes: ""
        };
    }

    getState() {
        return JSON.parse(JSON.stringify({
            date: eveningSelectionFormStore.getDate(),

            evening: eveningStore.getEvening().getPayload(),

            currentInvoice: this.currentInvoice,

            selectedDiningTable: this.selectedDiningTable,
            createdDiningTable: this.createdDiningTable,
            closingDiningTable: this.closingDiningTable,

            selectedOrdination: this.selectedOrdination,
            createdOrdination: this.createdOrdination,
            editingOrdination: this.editingOrdination,

            selectedOrder: this.selectedOrder,
            createdOrder: this.createdOrder,

            waiters: waitersStore.getWaiters().getPayload(),
            tables: tablesStore.getAllTables().getPayload(),
            categories: categoriesStore.getCategories().getPayload(),
            dishes: dishesStore.getDishes().getPayload(),
            phases: phasesStore.getPhases().getPayload(),
            additions: additionsStore.getAdditions().getPayload()
        }));
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;