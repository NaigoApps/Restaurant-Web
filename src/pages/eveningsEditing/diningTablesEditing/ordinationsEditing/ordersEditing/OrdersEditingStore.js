import eveningPageStore from "../../../EveningPageStore";
import {OrdersActionTypes} from "./OrdersActions";
import SubFeatureStore from "../../../../../stores/SubFeatureStore";
import phasesStore from "../../../../../stores/generic/PhasesStore";
import {EntitiesUtils} from "../../../../../utils/EntitiesUtils";
import {findByUuid, findIndexByUuid} from "../../../../../utils/Utils";
import dishesStore from "../../../../../stores/generic/DishesStore";
import StoresUtils from "../../../../StoresUtils";
import {OrdinationCreatorActionTypes} from "../OrdinationsCreatorActions";
import {AdditionPages} from "../../../../../components/widgets/wizard/graph-wizard/OrderAdditionsWizardPage";
import ordinationEditingStore from "../OrdinationEditingStore";

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

        this.additionsPage = null;
        this.additionTypePage = null;

        this.freeAdditionInput = StoresUtils.initTextInput();
        this.priceInput = StoresUtils.initFloatInput();
    }

    getState() {
        return Map({
            orders: this.orders,
            wizardPage: this.wizardPage,
            selectedCategory: this.selectedCategory,
            categoryPage: this.categoryPage,
            dishPage: this.dishPage,
            quantityInput: this.quantityInput,
            selectedPhase: this.selectedPhase,
            selectedOrder: this.selectedOrder,
            editingGroup: this.editingGroup,
            additionsPage: this.additionsPage,
            additionTypePage: this.additionTypePage,
            freeAdditionInput: this.freeAdditionInput,
            priceInput: this.priceInput
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
                this.quantityInput = StoresUtils.initIntInput(0);
                break;
            case OrdersActionTypes.SELECT_DISH_PAGE:
                this.dishPage = action.body;
                break;
            case OrdersActionTypes.SELECT_PHASE:
                this.selectedPhase = action.body;
                this.editingGroup = null;
                this.selectedOrder = null;
                break;
            case OrdersActionTypes.QUANTITY_CHANGE:
                this.quantityInput = this.quantityInput.set("text", action.body);
                break;
            case OrdersActionTypes.QUANTITY_CHAR:
                this.quantityInput = StoresUtils.intChar(this.quantityInput, action.body);
                break;
            case OrdersActionTypes.SELECT_GROUP:
                this.selectedOrder = this.theChosenOne(action.body);
                this.additionsPage = 0;
                this.freeAdditionInput = StoresUtils.initTextInput(this.getSelectedOrder().get('notes'));
                this.priceInput = StoresUtils.initFloatInput(this.getSelectedOrder().get('price'));
                break;
            case OrdersActionTypes.TOGGLE_GROUP_EDITING:
                if(this.editingGroup === action.body.get('groupId')){
                    this.editingGroup = null;
                }else {
                    this.editingGroup = action.body.get('groupId');
                }
                break;
            case OrdersActionTypes.REMOVE_GROUP:
                let ordersToRemove = action.body.get('orders').map(order => order.get('uuid'));
                this.orders = this.orders.filter(order => !ordersToRemove.includes(order.get('uuid')));
                this.editingGroup = null;
                break;
            case OrdersActionTypes.SELECT_ADDITION_TYPE_PAGE:
                this.additionTypePage = action.body;
                break;
            case OrdersActionTypes.SELECT_ADDITION_PAGE:
                this.additionsPage = action.body;
                break;
            case OrdersActionTypes.TOGGLE_ADDITION:
                this.toggleAddition(action.body);
                break;
            case OrdersActionTypes.FREE_ADDITION_CHAR:
                this.freeAdditionChar(action.body);
                break;
            case OrdersActionTypes.PRICE_CHAR:
                this.priceChar(action.body);
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

    initOrdersEditor(){
        this.wizardPage = OrdersWizardPages.DISHES_PAGE;
        this.selectedCategory = null;
        this.categoryPage = 0;
        this.selectedPhase = phasesStore.getPhases().getPayload().get(0).get('uuid');
        this.quantityInput = StoresUtils.initIntInput(0);
    }

    getSelectedOrder(){
        return findByUuid(this.orders, this.selectedOrder);
    }

    theChosenOne(grp){
        return grp.get('orders').get(0).get('uuid');
    }

    addOrder(dishUuid){
        let quantity = parseInt(this.quantityInput.get('text')) || 0;
        quantity = Math.max(quantity, 1);
        const phase = this.selectedPhase;

        let orders = List();
        for(let i = 0;i < quantity;i++) {
            let dish = findByUuid(dishesStore.getDishes().getPayload(), dishUuid);
            let newOrder = EntitiesUtils.newOrder(dish, phase);
            orders = orders.push(newOrder);
        }
        this.orders = this.orders.concat(orders);
    }

    toggleAddition(addition){
        if(this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex);

            let additionIndex = order.get('additions').indexOf(addition);
            if(additionIndex !== -1){
                order = order.set('additions', order.get('additions').remove(additionIndex));
            }else{
                order = order.set('additions', order.get('additions').push(addition));
            }
            this.orders = this.orders.set(orderIndex, order);
        }
    }

    freeAdditionChar(char){
        if(this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex);

            this.freeAdditionInput = StoresUtils.textChar(this.freeAdditionInput, char)
            order = order.set('notes', this.freeAdditionInput.get('text'));

            this.orders = this.orders.set(orderIndex, order);
        }
    }

    priceChar(char){
        if(this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex);

            this.priceInput = StoresUtils.floatChar(this.priceInput, char);
            if(!isNaN(parseFloat(this.priceInput.get('text'))))
            order = order.set('price', parseFloat(this.priceInput.get('text')));

            this.orders = this.orders.set(orderIndex, order);
        }
    }

    editOrderPhase(phase){
        if(this.selectedOrder) {
            let orderIndex = findIndexByUuid(this.orders, this.selectedOrder);
            let order = this.orders.get(orderIndex);

            order = order.set('phase', phase);

            this.orders = this.orders.set(orderIndex, order);
        }
    }

}

const ordersEditingStore = new OrdersEditingStore();
export default ordersEditingStore;