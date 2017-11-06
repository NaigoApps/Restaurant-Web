import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_BEGIN_CREATE_DINING_TABLE,
    ACT_CREATE_DINING_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES,
    ACT_UPDATE_DINING_TABLE_CREATOR_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_WAITER
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class DiningTablesCreatorActions {

    beginDiningTableCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_DINING_TABLE);
    }

    updateDiningTableCoverCharges(uuid, number) {
        dispatcher.fireEnd(ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES, number);
    }

    updateDiningTableWaiter(uuid, waiter) {
        dispatcher.fireEnd(ACT_UPDATE_DINING_TABLE_CREATOR_WAITER, waiter);
    }

    updateDiningTableTable(uuid, table) {
        dispatcher.fireEnd(ACT_UPDATE_DINING_TABLE_CREATOR_TABLE, table);
    }

    createDiningTable(table) {
        requestBuilder.post(ACT_CREATE_DINING_TABLE, 'dining-tables', table);
    }

}

const diningTablesCreatorActions = new DiningTablesCreatorActions();

export default diningTablesCreatorActions;