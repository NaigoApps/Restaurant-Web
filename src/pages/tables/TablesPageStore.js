import AbstractStore from "../../stores/AbstractStore";
import waitersStore from "../../stores/generic/WaitersStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_RESTAURANT_TABLE,
    ACT_CREATE_RESTAURANT_TABLE,
    ACT_DELETE_RESTAURANT_TABLE,
    ACT_DESELECT_RESTAURANT_TABLE,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_SELECT_RESTAURANT_TABLE,
    ACT_UPDATE_RESTAURANT_TABLE,
    ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME
} from "../../actions/ActionTypes";
import tablesStore from "../../stores/generic/TablesStore";

const EVT_TABLES_PAGE_STORE_CHANGED = "EVT_TABLES_PAGE_STORE_CHANGED";

class TablesPageStore extends AbstractStore{

    constructor(){
        super(EVT_TABLES_PAGE_STORE_CHANGED);
        this.selectedTable = null;
        this.inCreationTable = null;
    }

    setName(value){
        this.inCreationTable.name = value;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([tablesStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_RESTAURANT_TABLES:
                break;
            case ACT_CREATE_RESTAURANT_TABLE:
                this.selectedTable = action.body.uuid;
                this.inCreationTable = null;
                break;
            case ACT_UPDATE_RESTAURANT_TABLE:
                this.selectedTable = action.body.uuid;
                break;
            case ACT_DELETE_RESTAURANT_TABLE:
                this.selectedTable = null;
                break;
            case ACT_BEGIN_CREATE_RESTAURANT_TABLE:
                this.selectedTable = null;
                this.inCreationTable = this.buildTable();
                break;
            case ACT_SELECT_RESTAURANT_TABLE:
                this.selectedTable = action.body;
                this.inCreationTable = null;
                break;
            case ACT_DESELECT_RESTAURANT_TABLE:
                this.selectedTable = null;
                this.inCreationTable = null;
                break;
            case ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME:
                this.setName(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildTable(){
        return {
            name: ""
        };
    }

    getState(){
        return {
            tables: tablesStore.getAllTables().getPayload(),

            selectedTable: this.selectedTable,
            inCreationTable: this.inCreationTable
        }
    }

}

const tablesPageStore = new TablesPageStore();
export default tablesPageStore;