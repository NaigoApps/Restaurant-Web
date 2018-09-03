import {DataActions} from "../../actions/DataActions";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import requestBuilder from "../../actions/RequestBuilder";
import {SettingsPageActions} from "../settings/SettingsPageActions";

export class CategoriesPageActions {

    static BEGIN_CATEGORY_CREATION = "BEGIN_CATEGORY_CREATION";
    static SET_CATEGORY_EDITOR_NAME = "SET_CATEGORY_EDITOR_NAME";
    static SET_CATEGORY_EDITOR_LOCATION = "SET_CATEGORY_EDITOR_LOCATION";
    static SET_CATEGORY_EDITOR_COLOR = "SET_CATEGORY_EDITOR_COLOR";
    static CREATE_CATEGORY = "CREATE_CATEGORY";

    static DELETE_EDITING_CATEGORY = "DELETE_EDITING_CATEGORY";
    static UPDATE_EDITING_CATEGORY = "UPDATE_EDITING_CATEGORY";
    static SELECT_EDITING_CATEGORY = "SELECT_EDITING_CATEGORY";
    static SELECT_EDITING_CATEGORY_PAGE = "SELECT_EDITING_CATEGORY_PAGE";

    static initCategoryPage() {
        DataActions.loadCategories();
        DataActions.loadLocations();
        DataActions.loadAdditions();
        SettingsPageActions.loadSettings();
    }

    static beginCreation() {
        dispatcher.fireEnd(this.BEGIN_CATEGORY_CREATION);
    }

    static setEditorName(name) {
        dispatcher.fireEnd(this.SET_CATEGORY_EDITOR_NAME, name);
    }

    static setEditorLocation(value) {
        dispatcher.fireEnd(this.SET_CATEGORY_EDITOR_LOCATION, value);
    }

    static setEditorColor(value) {
        dispatcher.fireEnd(this.SET_CATEGORY_EDITOR_COLOR, value);
    }

    static createCategory(category) {
        requestBuilder.post(this.CREATE_CATEGORY, 'categories', category.toDto());
    }

    static selectNavigatorPage(page) {
        dispatcher.fireEnd(this.SELECT_EDITING_CATEGORY_PAGE, page);
    }

    static selectCategory(category) {
        dispatcher.fireEnd(this.SELECT_EDITING_CATEGORY, category);
    }

    static deleteCategory(category) {
        requestBuilder.remove(this.DELETE_EDITING_CATEGORY, 'categories', category.uuid);
    }

    static updateCategoryName(uuid, value) {
        requestBuilder.put(this.UPDATE_EDITING_CATEGORY, 'categories/' + uuid + '/name', value);
    }

    static updateCategoryLocation(uuid, value) {
        requestBuilder.put(this.UPDATE_EDITING_CATEGORY, 'categories/' + uuid + '/location', value.uuid);
    }

    static updateCategoryColor(uuid, value) {
        requestBuilder.put(this.UPDATE_EDITING_CATEGORY, 'categories/' + uuid + '/color', value);
    }

    static updateCategoryAdditions(uuid, values) {
        requestBuilder.put(this.UPDATE_EDITING_CATEGORY, 'categories/' + uuid + '/additions', values.map(value => value.uuid));
    }

}