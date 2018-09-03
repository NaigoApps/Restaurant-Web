import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {ApplicationActions} from "../../actions/ApplicationActions";
import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

export class DishesPageActions {

    static SELECT_EDITING_DISH = "SELECT_EDITING_DISH";
    static SELECT_EDITING_DISH_PAGE = "SELECT_EDITING_DISH_PAGE";
    static UPDATE_EDITING_DISH = "UPDATE_EDITING_DISH";
    static DELETE_EDITING_DISH = "DELETE_EDITING_DISH";

    static BEGIN_DISH_CREATION = "BEGIN_DISH_CREATION";
    static SET_DISH_EDITOR_NAME = "SET_DISH_EDITOR_NAME";
    static SET_DISH_EDITOR_DESCRIPTION = "SET_DISH_EDITOR_DESCRIPTION";
    static SET_DISH_EDITOR_PRICE = "SET_DISH_EDITOR_PRICE";
    static SET_DISH_EDITOR_CATEGORY = "SET_DISH_EDITOR_CATEGORY";
    static CREATE_DISH = "CREATE_DISH";
    static ABORT_DISH_CREATION = "ABORT_DISH_CREATION";

    static SHOW_CATEGORIES = "SHOW_CATEGORIES";
    static SHOW_ALL_CATEGORIES = "SHOW_ALL_CATEGORIES";

    static initDishesPage() {
        DataActions.loadCategories();
        DataActions.loadDishes();
        DataActions.loadDishStatuses();
        SettingsPageActions.loadSettings();
    }

    static beginDishCreation() {
        dispatcher.fireEnd(this.BEGIN_DISH_CREATION);
    }

    static setEditorName(name) {
        dispatcher.fireEnd(this.SET_DISH_EDITOR_NAME, name);
    }

    static setEditorDescription(desc) {
        dispatcher.fireEnd(this.SET_DISH_EDITOR_DESCRIPTION, desc);
    }

    static setEditorPrice(price) {
        dispatcher.fireEnd(this.SET_DISH_EDITOR_PRICE, price);
    }

    static setEditorCategory(category) {
        dispatcher.fireEnd(this.SET_DISH_EDITOR_CATEGORY, category);
    }

    static createDish(dish) {
        asyncActionBuilder.post(this.CREATE_DISH, 'dishes', dish.toDto());
    }

    static selectDish(dish) {
        dispatcher.fireEnd(this.SELECT_EDITING_DISH, dish);
    }

    static selectDishPage(page) {
        dispatcher.fireEnd(this.SELECT_EDITING_DISH_PAGE, page);
    }

    static updateDishName(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_DISH, 'dishes/' + uuid + '/name', value);
    }

    static updateDishDescription(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_DISH, 'dishes/' + uuid + '/description', value);
    }

    static updateDishPrice(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_DISH, 'dishes/' + uuid + '/price', value);
    }

    static updateDishStatus(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_DISH, 'dishes/' + uuid + '/status', value);
    }

    static updateDishCategory(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_DISH, 'dishes/' + uuid + '/category', value.uuid);
    }

    static deleteDish(dish) {
        asyncActionBuilder.remove(this.DELETE_EDITING_DISH, 'dishes', dish);
    }

    static showCategories(cats){
        dispatcher.fireEnd(this.SHOW_CATEGORIES, cats);
    }

    static showAllCategories(value){
        dispatcher.fireEnd(this.SHOW_ALL_CATEGORIES, value);
    }
}