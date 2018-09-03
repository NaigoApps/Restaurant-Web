import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

export class TablesPageActions {

    static BEGIN_R_TABLE_CREATION = "BEGIN_R_TABLE_CREATION";
    static SET_R_TABLE_EDITOR_NAME = "SET_R_TABLE_EDITOR_NAME";
    static CREATE_R_TABLE = "CREATE_R_TABLE";

    static SELECT_R_TABLE_PAGE = "SELECT_R_TABLE_PAGE";
    static SELECT_EDITING_R_TABLE = "SELECT_EDITING_R_TABLE";
    static UPDATE_R_TABLE = "UPDATE_R_TABLE";
    static DELETE_EDITING_R_TABLE = "DELETE_EDITING_R_TABLE";

    static initTablesPage() {
        SettingsPageActions.loadSettings();
        DataActions.loadRestaurantTables();
    }

    static setEditorName(name) {
        dispatcher.fireEnd(this.SET_R_TABLE_EDITOR_NAME, name)
    }

    static beginTableCreation() {
        dispatcher.fireEnd(this.BEGIN_R_TABLE_CREATION);
    }

    static selectTable(table) {
        dispatcher.fireEnd(this.SELECT_EDITING_R_TABLE, table);
    }

    static selectNavigatorPage(page) {
        dispatcher.fireEnd(this.SELECT_R_TABLE_PAGE, page);
    }

    static createTable(table) {
        asyncActionBuilder.post(this.CREATE_R_TABLE, 'restaurant-tables', table.toDto())
    }

    static updateTableName(uuid, name) {
        asyncActionBuilder.put(this.UPDATE_R_TABLE, 'restaurant-tables/' + uuid + "/name", name);
    }

    static deleteTable(table) {
        asyncActionBuilder.remove(this.DELETE_EDITING_R_TABLE, 'restaurant-tables', table.uuid);
    }
}