import EditorMode from "../../utils/EditorMode";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import applicationStore from "../../stores/ApplicationStore";
import AbstractStore from "../../stores/AbstractStore";
import dataStore from "../../stores/DataStore";
import {TablesPageActions} from "./TablesPageActions";
import RestaurantTable from "../../model/RestaurantTable";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import {Utils} from "../../utils/Utils";
import {DataActionTypes} from "../../actions/DataActions";

const EVT_TABLES_PAGE_STORE_CHANGED = "EVT_TABLES_PAGE_STORE_CHANGED";

class TablesPageStore extends AbstractStore {

    constructor() {
        super("tables", EVT_TABLES_PAGE_STORE_CHANGED, applicationStore, dataStore);
        this.editor = {
            mode: null,
            table: null
        };
        this.navigator = {
            page: 0
        }
    }

    getActionsClass() {
        return TablesPageActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};
        handlers[TablesPageActions.SELECT_EDITING_R_TABLE] = (table) => this.initEditor(table, false);
        handlers[TablesPageActions.BEGIN_R_TABLE_CREATION] = () =>
            this.initEditor(new RestaurantTable(EntitiesUtils.newRestaurantTable(), dataStore.getPool()), true);
        handlers[TablesPageActions.SET_R_TABLE_EDITOR_NAME] = (name) => this.editor.table.name = name;
        handlers[TablesPageActions.CREATE_R_TABLE] = (table) =>
            this.initEditor(dataStore.getEntity(table.uuid), false);
        handlers[TablesPageActions.DELETE_EDITING_R_TABLE] = () => this.initEditor();
        handlers[TablesPageActions.SELECT_R_TABLE_PAGE] = (page) => this.navigator.page = page;
        handlers[TablesPageActions.UPDATE_R_TABLE] = (table) =>
            this.initEditor(dataStore.getEntity(table.uuid), false);

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_RESTAURANT_TABLES] = () => Utils.nop();
        return handlers;
    }

    initEditor(table, creating) {
        this.editor = {
            mode: null,
            table: null
        };
        if (table) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.table = table;
        }
    }

    buildState() {
        return {
            editor: this.editor,
            navigator: this.navigator,
        };
    }

}

const tablesPageStore = new TablesPageStore();
export default tablesPageStore;