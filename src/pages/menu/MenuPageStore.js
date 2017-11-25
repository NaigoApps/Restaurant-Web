import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_ADDITION, ACT_BEGIN_CREATE_CATEGORY, ACT_BEGIN_CREATE_DISH,
    ACT_CREATE_ADDITION, ACT_CREATE_CATEGORY, ACT_CREATE_DISH,
    ACT_DELETE_ADDITION, ACT_DELETE_CATEGORY, ACT_DELETE_DISH,
    ACT_DESELECT_ADDITION, ACT_DESELECT_CATEGORY, ACT_DESELECT_DISH,
    ACT_RETRIEVE_ADDITIONS, ACT_RETRIEVE_CATEGORIES, ACT_RETRIEVE_DISH_STATUSES, ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_LOCATIONS,
    ACT_SELECT_ADDITION, ACT_SELECT_CATEGORY, ACT_SELECT_DISH,
    ACT_UPDATE_ADDITION,
    ACT_UPDATE_ADDITION_GENERIC,
    ACT_UPDATE_ADDITION_NAME,
    ACT_UPDATE_ADDITION_PRICE, ACT_UPDATE_CATEGORY, ACT_UPDATE_CATEGORY_CREATOR_NAME, ACT_UPDATE_DISH,
    ACT_UPDATE_DISH_CREATOR_DESCRIPTION,
    ACT_UPDATE_DISH_CREATOR_NAME, ACT_UPDATE_DISH_CREATOR_PRICE
} from "../../actions/ActionTypes";
import additionsStore from "../../generic/AdditionsStore";
import categoriesStore from "../../generic/CategoriesStore";
import dishesStore from "../../generic/DishesStore";
import dishesStatusesStore from "../../stores/generic/DishesStatusesStore";
import locationsStore from "../../stores/LocationsStore";

const EVT_MENU_PAGE_STORE_CHANGED = "EVT_MENU_PAGE_STORE_CHANGED";

class MenuPageStore extends AbstractStore{

    constructor(){
        super(EVT_MENU_PAGE_STORE_CHANGED);
        this.selectedCategory = null;
        this.inCreationCategory = null;
        this.selectedDish = null;
        this.inCreationDish = null;
    }

    getState(){
        return {
            categories: categoriesStore.getAllCategories(),
            selectedCategory: this.selectedCategory,
            inCreationCategory: this.inCreationCategory,
            dishes: dishesStore.getDishesByCategory(this.selectedCategory),
            selectedDish: this.selectedDish,
            inCreationDish: this.inCreationDish,
            dishesStatuses: dishesStatusesStore.getDishesStatuses(),
            locations: locationsStore.getLocations()
        }
    }

    setCategoryName(value){
        this.inCreationCategory.name = value;
    }

    setDishName(value){
        this.inCreationDish.name = value;
    }

    setDishPrice(value){
        this.inCreationDish.price = value;
    }

    setDishDescription(value){
        this.inCreationDish.description = value;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([categoriesStore.getToken(), dishesStore.getToken(), dishesStatusesStore.getToken(), locationsStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_DISH_STATUSES:
            case ACT_RETRIEVE_LOCATIONS:
                break;
            case ACT_CREATE_CATEGORY:
                this.selectedCategory = action.body.uuid;
                this.inCreationCategory = null;
                break;
            case ACT_CREATE_DISH:
                this.selectedDish = action.body.uuid;
                this.inCreationDish = null;
                break;
            case ACT_UPDATE_CATEGORY:
                this.selectedCategory = action.body.uuid;
                break;
            case ACT_UPDATE_DISH:
                this.selectedDish = action.body.uuid;
                this.selectedCategory = action.body.category;
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

    buildCategory(){
        return {
            name: "",
            dishes: []
        };
    }

    buildDish(){
        return {
            name: "",
            price: 0.0,
            description: "",
            category: this.selectedCategory
        };
    }

}

const menuPageStore = new MenuPageStore();
export default menuPageStore;