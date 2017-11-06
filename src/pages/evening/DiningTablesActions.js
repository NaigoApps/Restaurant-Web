import requestBuilder from "../../actions/RequestBuilder";
import {ACT_RETRIEVE_DINING_TABLES} from "../../actions/ActionTypes";

class DiningTablesActions {
    retrieveDiningTables() {
        requestBuilder.get(ACT_RETRIEVE_DINING_TABLES, 'dining-tables');
    }

}

const diningTablesActions = new DiningTablesActions();

export default diningTablesActions;