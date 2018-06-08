import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_RETRIEVE_ADDITIONS,
    ACT_RETRIEVE_CATEGORIES,
    ACT_RETRIEVE_DISH_STATUSES,
    ACT_RETRIEVE_DISHES,
    ACT_RETRIEVE_LOCATIONS
} from "../../actions/ActionTypes";
import categoriesStore from "../../stores/generic/CategoriesStore";
import dishesStore from "../../stores/generic/DishesStore";
import dishesStatusesStore from "../../stores/generic/DishesStatusesStore";
import locationsStore from "../../stores/LocationsStore";
import additionsStore from "../../stores/generic/AdditionsStore";
import {EditorStatus} from "../StoresUtils";
import {findByUuid} from "../../utils/Utils";
import {CategoriesEditorActionTypes} from "./CategoriesEditorActions";
import {CategoriesCreatorActionTypes} from "./CategoriesCreatorActions";
import {DishesCreatorActionTypes} from "./DishesCreatorActions";
import {DishesEditorActionTypes} from "./DishesEditorActions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {Map, List} = require('immutable');

const EVT_MENU_PAGE_STORE_CHANGED = "EVT_MENU_PAGE_STORE_CHANGED";

class MenuPageStore extends AbstractStore {

    constructor() {
        super(EVT_MENU_PAGE_STORE_CHANGED);
        this.categoriesEditorStatus = EditorStatus.SURFING;
        this.dishesEditorStatus = EditorStatus.SURFING;
        this.categoriesPage = 0;
        this.dishesPage = 0;
        this.category = null;
        this.dish = null;
    }

    getState() {
        const selectedCategory = this.getSelectedCategory();
        let result = Map({
            categories: categoriesStore.getCategories().getPayload(),
            dishes: selectedCategory ? dishesStore.getDishesByCategory(selectedCategory.get('uuid')) : List(),
            dishStatuses: dishesStatusesStore.getDishesStatuses().getPayload(),
            locations: locationsStore.getLocations().getPayload(),
            additions: additionsStore.getAdditions().getPayload(),
            dish: this.getSelectedDish(),
            category: selectedCategory,
            dishesEditorStatus: this.dishesEditorStatus,
            categoriesEditorStatus: this.categoriesEditorStatus,
            dishesPage: this.dishesPage,
            categoriesPage: this.categoriesPage,

            settings: applicationStore.getSettings()
        });
        return {
            data: result
        };
    }

    getSelectedCategory(){
        if(this.categoriesEditorStatus === EditorStatus.EDITING){
            return findByUuid(categoriesStore.getCategories().getPayload(), this.category);
        }else if(this.categoriesEditorStatus === EditorStatus.CREATING){
            return this.category;
        }
        return null
    }

    getSelectedDish(){
        if(this.dishesEditorStatus === EditorStatus.EDITING){
            return findByUuid(dishesStore.getDishesByCategory(this.category), this.dish);
        }else if(this.dishesEditorStatus === EditorStatus.CREATING){
            return this.dish;
        }
        return null;
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([categoriesStore.getToken(), dishesStore.getToken(), dishesStatusesStore.getToken(),
            locationsStore.getToken(), additionsStore.getToken(), applicationStore.getToken()]);
        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_CATEGORIES:
            case ACT_RETRIEVE_DISHES:
            case ACT_RETRIEVE_DISH_STATUSES:
            case ACT_RETRIEVE_LOCATIONS:
            case ACT_RETRIEVE_ADDITIONS:
                break;
            case CategoriesCreatorActionTypes.CREATE_CATEGORY:
            case CategoriesEditorActionTypes.UPDATE_EDITING_CATEGORY:
                this.category = action.body.get('uuid');
                this.categoriesEditorStatus = EditorStatus.EDITING;
                this.dish = null;
                this.dishesEditorStatus = EditorStatus.SURFING;
                break;
            case DishesCreatorActionTypes.CREATE_DISH:
            case DishesEditorActionTypes.UPDATE_EDITING_DISH:
                this.dish = action.body.get('uuid');
                this.dishesEditorStatus = EditorStatus.EDITING;
                this.category = action.body.get('category');
                break;
            case CategoriesEditorActionTypes.DESELECT_EDITING_CATEGORY:
            case CategoriesEditorActionTypes.DELETE_EDITING_CATEGORY:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.dishesPage = 0;
                this.category = null;
                this.categoriesEditorStatus = EditorStatus.SURFING;
                this.dish = null;
                this.dishesEditorStatus = EditorStatus.SURFING;
                break;
            case DishesEditorActionTypes.DESELECT_EDITING_DISH:
            case DishesEditorActionTypes.DELETE_EDITING_DISH:
            case DishesCreatorActionTypes.ABORT_DISH_CREATION:
                this.dish = null;
                this.dishesEditorStatus = EditorStatus.SURFING;
                break;
            case CategoriesCreatorActionTypes.BEGIN_CATEGORY_CREATION:
                this.category = EntitiesUtils.newCategory();
                this.categoriesEditorStatus = EditorStatus.CREATING;
                break;
            case DishesCreatorActionTypes.BEGIN_DISH_CREATION:
                this.dish = EntitiesUtils.newDish();
                this.dish = this.dish.set('category', this.category);
                this.dishesEditorStatus = EditorStatus.CREATING;
                break;
            case CategoriesEditorActionTypes.SELECT_EDITING_CATEGORY:
                this.category = action.body;
                this.categoriesEditorStatus = EditorStatus.EDITING;
                this.dish = null;
                this.dishesEditorStatus = EditorStatus.SURFING;
                break;
            case CategoriesEditorActionTypes.SELECT_EDITING_CATEGORY_PAGE:
                this.categoriesPage = action.body;
                break;
            case DishesEditorActionTypes.SELECT_EDITING_DISH:
                this.dish = action.body;
                this.dishesEditorStatus = EditorStatus.EDITING;
                break;
            case DishesEditorActionTypes.SELECT_EDITING_DISH_PAGE:
                this.dishesPage = action.body;
                break;
            case CategoriesCreatorActionTypes.SET_CREATING_CATEGORY_NAME:
                this.category = this.category.set('name', action.body);
                break;
            case CategoriesCreatorActionTypes.SET_CREATING_CATEGORY_LOCATION:
                this.category = this.category.set('location', action.body);
                break;
            case DishesCreatorActionTypes.SET_CREATING_DISH_NAME:
                this.dish = this.dish.set('name', action.body);
                break;
            case DishesCreatorActionTypes.SET_CREATING_DISH_DESCRIPTION:
                this.dish = this.dish.set('description', action.body);
                break;
            case DishesCreatorActionTypes.SET_CREATING_DISH_PRICE:
                this.dish = this.dish.set('price', action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

}

const menuPageStore = new MenuPageStore();
export default menuPageStore;