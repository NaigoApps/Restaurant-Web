import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_ADDITION, ACT_BEGIN_CREATE_DINING_TABLE, ACT_BEGIN_CREATE_ORDER, ACT_BEGIN_CREATE_ORDINATION,
    ACT_CREATE_ADDITION, ACT_CREATE_DINING_TABLE, ACT_CREATE_ORDER, ACT_CREATE_ORDINATION,
    ACT_DELETE_ADDITION, ACT_DELETE_DINING_TABLE, ACT_DELETE_ORDER, ACT_DELETE_ORDINATION,
    ACT_DESELECT_ADDITION, ACT_DESELECT_DINING_TABLE, ACT_DESELECT_DISH, ACT_DESELECT_ORDER, ACT_DESELECT_ORDINATION,
    ACT_RETRIEVE_ADDITIONS, ACT_RETRIEVE_CATEGORIES, ACT_RETRIEVE_DINING_TABLES, ACT_RETRIEVE_ORDERS,
    ACT_RETRIEVE_ORDINATIONS, ACT_RETRIEVE_PHASES,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_SELECT_ADDITION, ACT_SELECT_DINING_TABLE, ACT_SELECT_EVENING, ACT_SELECT_ORDER, ACT_SELECT_ORDINATION,
    ACT_UPDATE_ADDITION,
    ACT_UPDATE_ADDITION_GENERIC,
    ACT_UPDATE_ADDITION_NAME,
    ACT_UPDATE_ADDITION_PRICE, ACT_UPDATE_DINING_TABLE, ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES,
    ACT_UPDATE_DINING_TABLE_CREATOR_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_WAITER, ACT_UPDATE_EVENING,
    ACT_UPDATE_EVENING_DATE, ACT_UPDATE_ORDER, ACT_UPDATE_ORDER_DESCRIPTION, ACT_UPDATE_ORDER_DISH,
    ACT_UPDATE_ORDER_PHASE, ACT_UPDATE_ORDER_PRICE
} from "../../actions/ActionTypes";
import additionsStore from "../../generic/AdditionsStore";
import eveningStore from "../../stores/EveningStore";
import diningTablesStore from "../../stores/generic/DiningTablesStore";
import ordinationsStore from "../../stores/OrdinationsStore";
import ordersStore from "../../stores/OrdersStore";
import eveningSelectionFormStore from "../../stores/EveningSelectionFormStore";
import waitersStore from "../../generic/WaitersStore";
import tablesStore from "../../generic/TablesStore";
import categoriesStore from "../../generic/CategoriesStore";
import dishesStore from "../../generic/DishesStore";
import phasesStore from "../../stores/PhasesStore";

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

class EveningPageStore extends AbstractStore{

    constructor(){
        super(EVT_EVENING_PAGE_STORE_CHANGED);
        this.selectedDiningTable = null;
        this.createdDiningTable = null;
        this.selectedOrdination = null;
        this.createdOrdination = null;
        this.selectedOrder = null;
        this.createdOrder = null;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([
            eveningSelectionFormStore.getToken(),
            eveningStore.getToken(),
            diningTablesStore.getToken(),
            ordinationsStore.getToken(),
            ordersStore.getToken(),
            waitersStore.getToken(),
            tablesStore.getToken(),
            categoriesStore.getToken(),
            dishesStore.getToken(),
            phasesStore.getToken()
        ]);
        switch (action.type) {
            case ACT_UPDATE_EVENING_DATE:
            case ACT_RETRIEVE_DINING_TABLES:
            case ACT_RETRIEVE_ORDINATIONS:
            case ACT_RETRIEVE_ORDERS:
            case ACT_RETRIEVE_WAITERS:
            case ACT_RETRIEVE_RESTAURANT_TABLES:
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_PHASES:
            case ACT_SELECT_EVENING:
            case ACT_UPDATE_EVENING:
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
            case ACT_DESELECT_DINING_TABLE:
                this.selectedDiningTable = null;
                break;
            case ACT_DESELECT_ORDINATION:
                this.selectedDiningTable = null;
                break;
            case ACT_DESELECT_ORDER:
                this.selectedDiningTable = null;
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

    setDiningTableTable(table){
        this.createdDiningTable.table = table;
    }

    setDiningTableWaiter(waiter){
        this.createdDiningTable.waiter = waiter;
    }

    setDiningTableCoverCharges(cc){
        this.createdDiningTable.coverCharges = cc;
    }

    buildDiningTable(){
        return {
            table: "",
            phase: "",
            waiter: "",
            coverCharges: 2
        };
    }

    buildOrdination(){
        return {
            table: this.selectedDiningTable
        };
    }

    buildOrder(){
        return {
            ordination: this.selectedOrdination,
            dish: "",
            price: 0.0,
            notes: ""
        };
    }

    getState(){
        return {
            date: eveningSelectionFormStore.getDate(),

            evening: eveningStore.getEvening(),
            diningTables: diningTablesStore.getTables(),
            ordinations: ordinationsStore.getOrdinations(),
            orders: ordersStore.getOrders(),

            selectedDiningTable: this.selectedDiningTable,
            createdDiningTable: this.createdDiningTable,

            selectedOrdination: this.selectedOrdination,
            createdOrdination: this.createdOrdination,

            selectedOrder: this.selectedOrder,
            createdOrder: this.createdOrder,

            waiters: waitersStore.getWaiters(),
            tables: tablesStore.getAllTables(),
            categories: categoriesStore.getAllCategories(),
            dishes: dishesStore.getAllActiveDishes()
        }
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;