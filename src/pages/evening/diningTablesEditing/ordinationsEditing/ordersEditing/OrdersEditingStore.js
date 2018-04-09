import eveningPageStore from "../../../EveningPageStore";
import {OrdersActionTypes} from "./OrdersActions";
import SubFeatureStore from "../../../../../stores/SubFeatureStore";
import phasesStore from "../../../../../stores/generic/PhasesStore";
import {EntitiesUtils} from "../../../../../utils/EntitiesUtils";
import {findByUuid} from "../../../../../utils/Utils";
import dishesStore from "../../../../../stores/generic/DishesStore";
import StoresUtils from "../../../../StoresUtils";
import {OrdinationsActionTypes} from "../OrdinationsCreatorActions";

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
    }

    getState() {
        return Map({
            orders: this.orders,
            wizardPage: this.wizardPage,
            selectedCategory: this.selectedCategory,
            categoryPage: this.categoryPage,
            dishPage: this.dishPage,
            quantityInput: this.quantityInput,
            selectedPhase: this.selectedPhase
        })
    }

    getActions() {
        return Object.values(OrdersActionTypes).concat([
            OrdinationsActionTypes.BEGIN_ORDINATION_CREATION]);
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case OrdinationsActionTypes.BEGIN_ORDINATION_CREATION:
                this.orders = List();
                this.wizardPage = OrdersWizardPages.DISHES_PAGE;
                this.selectedCategory = null;
                this.categoryPage = 0;
                this.selectedPhase = phasesStore.getPhases().getPayload().get(0).get('uuid');
                this.quantityInput = StoresUtils.initIntInput(0);
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
                break;
            case OrdersActionTypes.QUANTITY_CHANGE:
                this.quantityInput = this.quantityInput.set("text", action.body);
                break;
            case OrdersActionTypes.QUANTITY_CHAR:
                this.quantityInput = StoresUtils.intChar(this.quantityInput, action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
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

}

const ordersEditingStore = new OrdersEditingStore();
export default ordersEditingStore;