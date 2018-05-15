import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {ACT_RETRIEVE_RESTAURANT_TABLES} from "../../actions/ActionTypes";
import tablesStore from "../../stores/generic/TablesStore";
import {TablesCreatorActionTypes} from "./TablesCreatorActions";
import {TablesEditorActionTypes} from "./TablesEditorActions";
import {EditorStatus} from "../StoresUtils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {findByUuid} from "../../utils/Utils";
import printersStore from "../../stores/generic/PrintersStore";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {fromJS, Map} = require('immutable');

const EVT_TABLES_PAGE_STORE_CHANGED = "EVT_TABLES_PAGE_STORE_CHANGED";

class TablesPageStore extends AbstractStore {

    constructor() {
        super(EVT_TABLES_PAGE_STORE_CHANGED);
        this.table = null;
        this.page = 0;
        this.editorStatus = EditorStatus.SURFING;
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([tablesStore.getToken(), applicationStore.getToken()]);
        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_RESTAURANT_TABLES:
                break;
            case TablesCreatorActionTypes.CREATE_R_TABLE:
            case TablesEditorActionTypes.UPDATE_R_TABLE:
                this.table = action.body.get('uuid');
                this.editorStatus = EditorStatus.EDITING;
                break;
            case TablesEditorActionTypes.DESELECT_EDITING_R_TABLE:
            case TablesEditorActionTypes.DELETE_EDITING_R_TABLE:
            case TablesCreatorActionTypes.ABORT_R_TABLE_CREATION:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.table = null;
                this.editorStatus = EditorStatus.SURFING;
                break;
            case TablesCreatorActionTypes.BEGIN_R_TABLE_CREATION:
                this.table = EntitiesUtils.newRestaurantTable();
                this.editorStatus = EditorStatus.CREATING;
                break;
            case TablesEditorActionTypes.SELECT_EDITING_R_TABLE:
                this.table = action.body;
                this.editorStatus = EditorStatus.EDITING;
                break;
            case TablesEditorActionTypes.SELECT_R_TABLE_PAGE:
                this.page = action.body;
                break;
            case TablesCreatorActionTypes.SET_CREATING_R_TABLE_NAME:
                this.table = this.table.set('name', action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        let result = Map({
            tables: tablesStore.getAllTables().getPayload(),

            table: this.getSelectedTable(),
            editorStatus: this.editorStatus,
            page: this.page,

            settings: applicationStore.getSettings()
        });

        return {
            data: result
        }
    }

    getSelectedTable() {
        if (this.editorStatus === EditorStatus.EDITING) {
            return findByUuid(tablesStore.getAllTables().getPayload(), this.table);
        } else if (this.editorStatus === EditorStatus.CREATING) {
            return this.table;
        }
        return null;
    }

}

const tablesPageStore = new TablesPageStore();
export default tablesPageStore;