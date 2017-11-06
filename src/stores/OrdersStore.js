import {
    ACT_BEGIN_CREATE_ORDER,
    ACT_CREATE_ORDER,
    ACT_RETRIEVE_ORDERS,
    ACT_SELECT_ORDER,
    ACT_SELECT_ORDINATION,
    ACT_UPDATE_ORDER,
    ACT_UPDATE_ORDER_DESCRIPTION,
    ACT_UPDATE_ORDER_DISH,
    ACT_UPDATE_ORDER_PHASE,
    ACT_UPDATE_ORDER_PRICE
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import dishesStore from "../generic/DishesStore";
import phasesStore from "./PhasesStore";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_ORDERS_STORE_CHANGED = "EVT_ORDERS_STORE_CHANGED";

class OrdersStore extends AbstractEntityStore {

    constructor() {
        super();
        this.selectedOrdination = null;
        this.selectedOrder = null;
        this.inCreationOrder = {};
        this.clear();
    }

    clear() {
        this.creating = false;
    }

    reset() {
        this.creating = true;
        this.inCreationOrder = {
            ordination: this.selectedOrdination,
            phase: phasesStore.getPhases()[0]
        };
    }

    getOrders() {
        return this.getLazyData().getPayload();
    }

    getOrdinationOrders() {
        let orders = this.getLazyData();
        if (this.selectedOrdination) {
            return orders.getPayload().filter(o => o.ordination === this.selectedOrdination);
        }
        return [];
    }

    getCompactOrdinationOrders() {
        let tableOrders = this.getLazyData().getPayload();
        if (this.selectedOrdination) {
            let orders = tableOrders.filter(o => o.ordination === this.selectedOrdination);
            let compactOrders = [];
            orders.forEach(order => this.addCompactOrder(compactOrders, order));
            return orders;
        }
        return [];
    }

    addCompactOrder(orders, order) {
        let added = false;
        orders.forEach(o => {
            if (o.dish === order.dish) {
                o.quantity++;
            }
        });
        if(!added){
            order.quantity = 1;
            orders.push(order);
        }
    }

    getInCreationOrder() {
        if (this.creating) {
            return this.inCreationOrder;
        }
        return null;
    }

    selectOrder(uuid) {
        this.selectedOrder = uuid;
    }

    getSelectedOrder() {
        return this.selectedOrder;
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_ORDERS:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_ORDERS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_CREATE_ORDER:
                this.createData(action.body);
                this.clear();
                break;
            case ACT_SELECT_ORDER:
                this.selectOrder(action.body);
                this.clear();
                break;
            case ACT_UPDATE_ORDER:
                this.updateData(action.body);
                break;
            case ACT_SELECT_ORDINATION:
                this.selectedOrdination = action.body;
                break;
            case ACT_BEGIN_CREATE_ORDER:
                this.reset();
                break;
            case ACT_UPDATE_ORDER_PRICE:
                this.inCreationOrder.price = action.body;
                break;
            case ACT_UPDATE_ORDER_DISH:
                this.inCreationOrder.dish = action.body;
                this.inCreationOrder.price = dishesStore.getAllActiveDishes().find(d => d.uuid === action.body).price;
                break;
            case ACT_UPDATE_ORDER_PHASE:
                this.inCreationOrder.phase = action.body;
                break;
            case ACT_UPDATE_ORDER_DESCRIPTION:
                this.inCreationOrder.notes = action.body;
                break;
            default:
                changed = false;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_ORDERS_STORE_CHANGED;
    }


}

const ordersStore = new OrdersStore();
export default ordersStore;