import {
    ACT_BEGIN_CREATE_RESTAURANT_TABLE, ACT_DELETE_RESTAURANT_TABLE,
    ACT_DESELECT_RESTAURANT_TABLE,
    ACT_SELECT_RESTAURANT_TABLE, ACT_UPDATE_RESTAURANT_TABLE
} from "../../actions/ActionTypes"
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class TablesEditorActions {

    selectTable(table) {
        dispatcher.fireEnd(ACT_SELECT_RESTAURANT_TABLE, table);
    }

    deselectTable(){
        dispatcher.fireEnd(ACT_DESELECT_RESTAURANT_TABLE);
    }

    updateTableName(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_RESTAURANT_TABLE, 'restaurant-tables/' + uuid + '/name', value);
    }

    deleteTable(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_RESTAURANT_TABLE, 'restaurant-tables', uuid);
    }

}

const tablesEditorActions = new TablesEditorActions();
export default tablesEditorActions;