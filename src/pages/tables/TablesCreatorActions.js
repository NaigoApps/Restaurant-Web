import {
    ACT_BEGIN_CREATE_RESTAURANT_TABLE, ACT_CREATE_RESTAURANT_TABLE,
    ACT_DESELECT_RESTAURANT_TABLE,
    ACT_SELECT_RESTAURANT_TABLE,
    ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME
} from "../../actions/ActionTypes"
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class TablesCreatorActions {

    updateTableName(uuid, name) {
        dispatcher.fireEnd(ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME, name);
    }

    beginTableCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_RESTAURANT_TABLE);
    }

    createTable(table) {
        asyncActionBuilder.post(ACT_CREATE_RESTAURANT_TABLE, 'restaurant-tables', table);
    }
}

const tablesCreatorActions = new TablesCreatorActions();
export default tablesCreatorActions;