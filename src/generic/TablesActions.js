import asyncActionBuilder from "../actions/RequestBuilder";
import {ACT_RETRIEVE_RESTAURANT_TABLES} from "../actions/ActionTypes";

class TablesActions {

    retrieveTables() {
        asyncActionBuilder.get(ACT_RETRIEVE_RESTAURANT_TABLES, 'restaurant-tables');
    }

}

const tablesActions = new TablesActions();
export default tablesActions;