import RootFeatureStore from "../../stores/RootFeatureStore";
import EditorMode from "../../utils/EditorMode";
import {DishesPageActions} from "./DishesPageActions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore, {Topics} from "../../stores/DataStore";
import Dish from "../../model/Dish";
import {DataActionTypes} from "../../actions/DataActions";
import {Utils} from "../../utils/Utils";

const EVT_MENU_PAGE_STORE_CHANGED = "EVT_MENU_PAGE_STORE_CHANGED";

class DishesPageStore extends RootFeatureStore {

    constructor() {
        super(EVT_MENU_PAGE_STORE_CHANGED);
        this.categories = [];
        this.initEditor();
        this.navigator = {
            page: 0
        }
    }

    getStoreDependencies() {
        return [dataStore, applicationStore];
    }

    getState() {
        return {
            data: {
                categories: dataStore.getEntities(Topics.CATEGORIES),
                visibleCategories: this.categories,
                visibleDishes: this.categories.map(cat => cat.dishes).reduce((a, b) => a.concat(b), []).sort(EntitiesUtils.nameComparator),
                dishStatuses: dataStore.getEntities(Topics.DISH_STATUSES),
                locations: dataStore.getEntities(Topics.LOCATIONS),
                additions: dataStore.getEntities(Topics.ADDITIONS),

                editor: this.editor,
                navigator: this.navigator,

                settings: applicationStore.getSettings()
            }
        };
    }

    initEditor(dish, creating) {
        this.editor = {
            mode: null,
            dish: null
        };
        if (dish) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.dish = dish;
        }
    }

    getCompletionHandlers() {
        const handlers = {};

        handlers[DishesPageActions.BEGIN_DISH_CREATION] = () =>
            this.initEditor(Dish.create(EntitiesUtils.newDish(), dataStore.getPool()), true);
        handlers[DishesPageActions.SET_DISH_EDITOR_NAME] = (value) => this.editor.dish.name = value;
        handlers[DishesPageActions.SET_DISH_EDITOR_DESCRIPTION] = (value) => this.editor.dish.description = value;
        handlers[DishesPageActions.SET_DISH_EDITOR_PRICE] = (value) => this.editor.dish.price = value;
        handlers[DishesPageActions.SET_DISH_EDITOR_CATEGORY] = (value) => this.editor.dish.category = value;
        handlers[DishesPageActions.CREATE_DISH] = (dish) =>
            this.initEditor(Dish.create(dish.toJS(), dataStore.getPool()));
        handlers[DishesPageActions.SELECT_EDITING_DISH] = (dish) => this.initEditor(dish);
        handlers[DishesPageActions.UPDATE_EDITING_DISH] = (dish) =>
            this.initEditor(Dish.create(dish.toJS(), dataStore.getPool()));
        handlers[DishesPageActions.DELETE_EDITING_DISH] = () =>
            this.initEditor();
        handlers[DishesPageActions.SELECT_EDITING_DISH_PAGE] = (page) => this.navigator.page = page;

        handlers[DishesPageActions.SHOW_CATEGORIES] = (cats) => this.categories = cats;
        handlers[DishesPageActions.SHOW_ALL_CATEGORIES] = (value) => this.categories = value ? dataStore.getEntities(Topics.CATEGORIES) : [];

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_CATEGORIES] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_LOCATIONS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_ADDITIONS] = () => Utils.nop();

        return handlers;
    }

}

const dishesPageStore = new DishesPageStore();
export default dishesPageStore;