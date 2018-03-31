import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_CATEGORY,
    ACT_BEGIN_CREATE_DISH,
    ACT_CREATE_CATEGORY,
    ACT_CREATE_DISH,
    ACT_DELETE_CATEGORY,
    ACT_DELETE_DISH,
    ACT_DESELECT_CATEGORY,
    ACT_DESELECT_DISH, ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_DISH_STATUSES,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_LOCATIONS,
    ACT_SELECT_CATEGORY,
    ACT_SELECT_DISH,
    ACT_UPDATE_CATEGORY,
    ACT_UPDATE_CATEGORY_CREATOR_LOCATION,
    ACT_UPDATE_CATEGORY_CREATOR_NAME,
    ACT_UPDATE_DISH,
    ACT_UPDATE_DISH_CREATOR_DESCRIPTION,
    ACT_UPDATE_DISH_CREATOR_NAME,
    ACT_UPDATE_DISH_CREATOR_PRICE
} from "../../actions/ActionTypes";
import categoriesStore from "../../stores/generic/CategoriesStore";
import dishesStore from "../../stores/generic/DishesStore";
import dishesStatusesStore from "../../stores/generic/DishesStatusesStore";
import locationsStore from "../../stores/LocationsStore";
import additionsStore from "../../stores/generic/AdditionsStore";

const {Map} = require('immutable');

const EVT_MENU_PAGE_STORE_CHANGED = "EVT_MENU_PAGE_STORE_CHANGED";

class MenuPageStore extends AbstractStore {

    constructor() {
        super(EVT_MENU_PAGE_STORE_CHANGED);
        this.selectedCategory = null;
        this.inCreationCategory = null;
        this.selectedDish = null;
        this.inCreationDish = null;
    }

    getState() {
        let result = Map({
            categories: categoriesStore.getCategories().getPayload(),
            dishes: dishesStore.getDishesByCategory(this.selectedCategory),
            dishStatuses: dishesStatusesStore.getDishesStatuses().getPayload(),
            locations: locationsStore.getLocations().getPayload(),
            additions: additionsStore.getAdditions().getPayload(),
            selectedDish: this.selectedDish,
            createdDish: this.inCreationDish,
            selectedCategory: this.selectedCategory,
            createdCategory: this.inCreationCategory
        });
        return {
            data: result
        };
    }

    setCategoryName(value) {
        this.inCreationCategory = this.inCreationCategory.set('name', value);
    }

    setCategoryLocation(value) {
        this.inCreationCategory = this.inCreationCategory.set('location', value);
    }

    setDishName(value) {
        this.inCreationDish = this.inCreationDish.set('name', value);
    }

    setDishPrice(value) {
        this.inCreationDish = this.inCreationDish.set('price', value);
    }

    setDishDescription(value) {
        this.inCreationDish = this.inCreationDish.set('description', value);
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([categoriesStore.getToken(), dishesStore.getToken(), dishesStatusesStore.getToken(),
            locationsStore.getToken(), additionsStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_DISH_STATUSES:
            case ACT_RETRIEVE_LOCATIONS:
            case ACT_RETRIEVE_ADDITIONS:
                break;
            case ACT_CREATE_CATEGORY:
                this.selectedCategory = action.body.get('uuid');
                this.inCreationCategory = null;
                break;
            case ACT_CREATE_DISH:
                this.selectedDish = action.body.get('uuid');
                this.inCreationDish = null;
                break;
            case ACT_UPDATE_CATEGORY:
                this.selectedCategory = action.body.get('uuid');
                break;
            case ACT_UPDATE_DISH:
                this.selectedDish = action.body.get('uuid');
                this.selectedCategory = action.body.get('category');
                break;
            case ACT_DELETE_CATEGORY:
                this.selectedCategory = null;
                break;
            case ACT_DELETE_DISH:
                this.selectedDish = null;
                break;
            case ACT_BEGIN_CREATE_CATEGORY:
                this.selectedCategory = null;
                this.inCreationCategory = this.buildCategory();
                break;
            case ACT_BEGIN_CREATE_DISH:
                this.selectedDish = null;
                this.inCreationDish = this.buildDish();
                break;
            case ACT_SELECT_CATEGORY:
                this.selectedCategory = action.body;
                this.selectedDish = null;
                this.inCreationCategory = null;
                this.inCreationDish = null;
                break;
            case ACT_SELECT_DISH:
                this.selectedDish = action.body;
                this.inCreationDish = null;
                break;
            case ACT_DESELECT_CATEGORY:
                this.selectedCategory = null;
                this.selectedDish = null;
                this.inCreationDish = null;
                this.inCreationCategory = null;
                break;
            case ACT_DESELECT_DISH:
                this.selectedDish = null;
                this.inCreationDish = null;
                break;
            case ACT_UPDATE_CATEGORY_CREATOR_NAME:
                this.setCategoryName(action.body);
                break;
            case ACT_UPDATE_CATEGORY_CREATOR_LOCATION:
                this.setCategoryLocation(action.body);
                break;
            case ACT_UPDATE_DISH_CREATOR_NAME:
                this.setDishName(action.body);
                break;
            case ACT_UPDATE_DISH_CREATOR_PRICE:
                this.setDishPrice(action.body);
                break;
            case ACT_UPDATE_DISH_CREATOR_DESCRIPTION:
                this.setDishDescription(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildCategory() {
        return Map({
            name: "",
            location: null,
            dishes: []
        });
    }

    buildDish() {
        return Map({
            name: "",
            price: 0.0,
            description: "",
            category: this.selectedCategory
        });
    }

}

const menuPageStore = new MenuPageStore();
export default menuPageStore;