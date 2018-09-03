import eveningPageStore from "../../../EveningPageStore";
import {OrdersActionTypes} from "./OrdersActions";
import SubFeatureStore from "../../../../../stores/SubFeatureStore";
import phasesStore from "../../../../../stores/generic/PhasesStore";
import {EntitiesUtils} from "../../../../../utils/EntitiesUtils";
import {findByUuid, findIndexByUuid} from "../../../../../utils/Utils";
import {OrdinationCreatorActionTypes} from "../OrdinationsCreatorActions";
import {AdditionPages} from "../../../../../components/widgets/wizard/graph-wizard/OrderAdditionsWizardPage";
import OrdinationsUtils from "../../../OrdinationsUtils";
import additionsStore from "../../../../../stores/generic/AdditionsStore";
import dataStore, {Topics} from "../../../../../stores/DataStore";

const {Map, List, fromJS} = require('immutable');

export const OrdersWizardPages = {
    DISHES_PAGE: 0,
};

class OrdersEditingStore extends SubFeatureStore {
    constructor() {
        super(eveningPageStore, "ordersEditing");
        this.orders = null;
        this.wizardPage = null;

        this.selectedCategory = null;
        this.categoryPage = null;
        this.dishPage = null;

        this.selectedPhase = null;

        this.selectedOrder = null;

        this.quantity = 1;

        this.additionsPage = null;
    }

    getState() {
        return Map({
            orders: this.orders,
            wizardPage: this.wizardPage,
            selectedCategory: this.selectedCategory,
            categoryPage: this.categoryPage,
            dishPage: this.dishPage,
            quantity: this.quantity,
            selectedPhase: this.selectedPhase,
            selectedOrder: this.selectedOrder,
            editingGroup: this.editingGroup,
            additionsPage: this.additionsPage,
        })
    }

    getActions() {
        return Object.values(OrdersActionTypes).concat([
            OrdinationCreatorActionTypes.BEGIN_ORDINATION_CREATION]);
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case OrdinationCreatorActionTypes.BEGIN_ORDINATION_CREATION:
                this.orders = List();
                this.initOrdersEditor();
                break;
            case OrdersActionTypes.BEGIN_ORDERS_EDITING:
                this.orders = action.body;
                this.initOrdersEditor();
                break;
            case OrdersActionTypes.SELECT_WIZARD_PAGE:
                this.wizardPage = action.body;
                this.additionTypePage = AdditionPages.FIXED;
                break;
            case OrdersActionTypes.SELECT_CATEGORY:
                this.selectedCategory = action.body;
                this.dishPage = 0;
                break;
            case OrdersActionTypes.SELECT_CATEGORY_PAGE:
                this.categoryPage = action.body;
                break;
            case OrdersActionTypes.SELECT_DISH:
                this.addOrder(action.body);
                this.quantity = 1;
                break;
            case OrdersActionTypes.SELECT_DISH_PAGE:
                this.dishPage = action.body;
                break;
            case OrdersActionTypes.SELECT_PHASE:
                this.selectedPhase = action.body;
                this.editingGroup = null;
                this.selectedOrder = null;
                break;
            case OrdersActionTypes.QUANTITY_CONFIRM:
                this.quantity = action.body;
                break;
            case OrdersActionTypes.SELECT_GROUP:
                this.selectedOrder = this.theChosenOne(action.body);
                this.additionsPage = 0;
                break;
            case OrdersActionTypes.TOGGLE_GROUP_EDITING:
                if (this.editingGroup === action.body.get('groupId')) {
                    this.editingGroup = null;
                } else {
                    this.editingGroup = action.body.get('groupId');
                }
                break;
            case OrdersActionTypes.REMOVE_GROUP:
                let ordersToRemove = action.body.get('orders').map(order => order.get('uuid'));
                this.orders = this.orders.filter(order => !ordersToRemove.includes(order.get('uuid')));
                this.editingGroup = null;
                break;
            case OrdersActionTypes.SELECT_ADDITION_PAGE:
                this.additionsPage = action.body;
                break;
            case OrdersActionTypes.TOGGLE_ADDITION:
                this.toggleAddition(action.body);
                break;
            case OrdersActionTypes.SET_FREE_ADDITION:
                this.setFreeAddition(action.body);
                break;
            case OrdersActionTypes.SET_PRICE:
                this.setPrice(action.body);
                break;
            case OrdersActionTypes.SET_QUANTITY:
                this.setQuantity(action.body);
                break;
            case OrdersActionTypes.ORDER_PHASE:
                this.editOrderPhase(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    initOrdersEditor() {
        this.wizardPage = OrdersWizardPages.DISHES_PAGE;
        this.selectedCategory = null;
        this.categoryPage = 0;
        this.selectedPhase = phasesStore.getPhases().getPayload().get(0).get('uuid');
        this.quantity = 1;
    }

    getSelectedOrder() {
        return findByUuid(this.orders, this.selectedOrder);
    }

    theChosenOne(grp) {
        return grp.get('orders').get(0).get('uuid');
    }

    addOrder(dishUuid) {
        const phase = this.selectedPhase;

        let orders = List();
        for (let i = 0; i < this.quantity; i++) {
            let dish = findByUuid(dataStore.getEntities(Topics.DISHES), dishUuid);
            let newOrder = EntitiesUtils.newOrder(dish, phase);
            orders = orders.push(newOrder);
        }
        this.orders = this.orders.concat(orders);
    }

    toggleAddition(addition) {
        if (this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex);

            let additionIndex = order.get('additions').indexOf(addition);

            let additionEntity = findByUuid(additionsStore.getAdditions().getPayload(), addition);

            if (additionIndex !== -1) {
                order = order.set('additions', order.get('additions').remove(additionIndex));
                order = order.set('price', order.get('price') - additionEntity.get('price'));
            } else {
                order = order.set('additions', order.get('additions').push(addition));
                order = order.set('price', order.get('price') + additionEntity.get('price'));
            }
            this.orders = this.orders.set(orderIndex, order);
        }
    }

    setFreeAddition(text) {
        if (this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);

            let order = this.orders.get(orderIndex).set('notes', text);

            this.orders = this.orders.set(orderIndex, order);
        }
    }

    setQuantity(value) {
        let oldValue = value;
        let order = findByUuid(this.orders, this.selectedOrder);
        let toRemove = [];
        this.orders.forEach(o => {
            if(OrdinationsUtils.sameOrder(o, order)){
                if(value > 0){
                    value--;
                }else{
                    toRemove.push(o.get('uuid'));
                }
            }
        });
        if(toRemove.length > 0){
            this.orders = this.orders.filter(o => !toRemove.includes(o.get('uuid')));
        }else {
            while(value > 0){
                this.orders = this.orders.push(EntitiesUtils.duplicateOrder(order));
                value--;
            }
        }
        if(oldValue === 0){
            this.selectedOrder = null;
        }
    }

    setPrice(value) {
        if (this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex).set('price', value);

            this.orders = this.orders.set(orderIndex, order);
        }
    }

    editOrderPhase(phase) {
        if (this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex);

            order = order.set('phase', phase);

            this.orders = this.orders.set(orderIndex, order);
        }
    }

}

const ordersEditingStore = new OrdersEditingStore();
export default ordersEditingStore;