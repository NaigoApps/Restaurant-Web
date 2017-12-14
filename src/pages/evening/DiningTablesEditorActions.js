import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_DELETE_DINING_TABLE, ACT_DESELECT_DINING_TABLE, ACT_PRINT_PARTIAL_BILL, ACT_SELECT_DINING_TABLE,
    ACT_UPDATE_DINING_TABLE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import ordinationsActions from "./OrdinationsActions";
import ordersActions from "./OrdersActions";

class DiningTablesEditorActions {

    updateDiningTableCoverCharges(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/cover-charges',
            value.toString()
        );
    }

    updateDiningTableWaiter(uuid, value) {
        requestBuilder.put(
            ACT_UPDATE_DINING_TABLE,
            'dining-tables/' + uuid + '/waiter',
            value
        );
    }

    updateDiningTableTable(uuid, value) {
        requestBuilder.put(ACT_UPDATE_DINING_TABLE, 'dining-tables/' + uuid + '/table', value);
    }

    selectDiningTable(table) {
        dispatcher.fireEnd(ACT_SELECT_DINING_TABLE, table);
        ordinationsActions.retrieveOrdinations();
        ordersActions.retrieveOrders();
    }

    deselectDiningTable() {
        dispatcher.fireEnd(ACT_DESELECT_DINING_TABLE);
    }

    deleteDiningTable(uuid) {
        requestBuilder.remove(ACT_DELETE_DINING_TABLE, 'dining-tables', uuid);
    }

    printPartialBill(uuid){
        requestBuilder.post(ACT_PRINT_PARTIAL_BILL, 'dining-tables/print-partial-bill', uuid);
    }
}

const diningTablesEditorActions = new DiningTablesEditorActions();

export default diningTablesEditorActions;