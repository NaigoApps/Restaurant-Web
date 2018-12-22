import OrdersEditorActions from "./OrdersEditorActions";
import DiningTablesEditorActions from "../DiningTablesEditorActions";
import EveningEditorActions from "../../EveningEditorActions";
import AbstractStore from "../../../../stores/AbstractStore";
import EveningSelectorActions from "../../eveningSelection/EveningSelectorActions";
import CRUDStatus from "../../../../utils/CRUDStatus";
import ordinationEditingStore from "./OrdinationEditingStore";
import OrdinationsUtils from "../../OrdinationsUtils";

const EVT_ORDERS_EDITOR_CHANGED = "EVT_ORDERS_EDITOR_CHANGED";

class OrdersEditingStore extends AbstractStore {
    constructor() {
        super("ordersEditing", EVT_ORDERS_EDITOR_CHANGED, ordinationEditingStore);
        this.init();
    }

    init() {
        this.crudStatus = CRUDStatus.RETRIEVE;
        this.currentOrders = [];
    }

    buildState() {
        return {
            crudStatus: this.crudStatus,
            currentOrders: this.currentOrders,
        };
    }

    getActionsClass() {
        return OrdersEditorActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        this.addCRUDHandlers(handlers);

        AbstractStore.assign(handlers, [
            EveningEditorActions.GET_SELECTED,
            EveningEditorActions.DESELECT_EVENING,
            EveningEditorActions.SHOW_EVENING_REVIEW,
            EveningSelectorActions.CHOOSE,
            DiningTablesEditorActions.SELECT_DINING_TABLE,
        ], () => this.init());

        return handlers;
    }

    addCRUDHandlers(handlers) {

        handlers[OrdersEditorActions.CRUD.BEGIN_CREATION] = () => {
            this.crudStatus = CRUDStatus.CREATE;
        };

        handlers[OrdersEditorActions.CRUD.ABORT_CREATION] = () => {
            this.crudStatus = CRUDStatus.RETRIEVE;
        };

        handlers[OrdersEditorActions.CRUD.CREATE] = (ordination) => {
            this.crudStatus = CRUDStatus.UPDATE;
        };

        handlers[OrdersEditorActions.CRUD.SELECT] = (orders) => {
            this.currentOrders = orders;
            this.additionsPage = 0;
            this.crudStatus = CRUDStatus.UPDATE;
        };

        this.addUpdateHandlers(handlers);

        handlers[OrdersEditorActions.CRUD.DESELECT] = () => this.init();

        handlers[OrdersEditorActions.CRUD.BEGIN_DELETION] = () => {
            this.crudStatus = CRUDStatus.DELETE;
        };

        handlers[OrdersEditorActions.CRUD.ABORT_DELETION] = () => {
            this.crudStatus = CRUDStatus.UPDATE;
        };

        handlers[OrdersEditorActions.CRUD.DELETE] = () => {
            this.currentOrders = [];
            this.crudStatus = CRUDStatus.RETRIEVE;
        }
    }

    addUpdateHandlers(handlers) {
        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.PRICE] = (price) => {
            this.currentOrders[0].price = price;
            this.currentOrders = this.similarOrders(this.currentOrders[0]);
        };

        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.FREE_ADDITION] = (notes) => {
            this.currentOrders[0].notes = notes;
            this.currentOrders = this.similarOrders(this.currentOrders[0]);
        };

        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.ADD_ADDITION] = (addition) => {
            this.currentOrders[0].addAddition(addition);
            this.currentOrders = this.similarOrders(this.currentOrders[0]);
        };

        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.REMOVE_ADDITION] = (addition) => {
            this.currentOrders[0].removeAddition(addition);
            this.currentOrders = this.similarOrders(this.currentOrders[0]);
        };

        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.PHASE] = (phase) => {
            this.currentOrders[0].phase = phase;
            this.currentOrders = this.similarOrders(this.currentOrders[0]);
        };

        AbstractStore.assign(handlers, [
            OrdersEditorActions.CRUD.UPDATE.LOCAL.QUANTITY.LESS,
            OrdersEditorActions.CRUD.UPDATE.LOCAL.QUANTITY.MORE], () => {
            this.currentOrders = this.similarOrders(this.currentOrders[0]);
            if (this.currentOrders.length === 0) {
                this.crudStatus = CRUDStatus.RETRIEVE;
            }
        });

    }

    similarOrders(order) {
        const orders = ordinationEditingStore.currentOrdination.orders;
        return orders.filter(o => OrdinationsUtils.sameOrder(o, order));
    }
}

const ordersEditingStore = new OrdersEditingStore();
export default ordersEditingStore;