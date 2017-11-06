import dispatcher from "../../dispatcher/SimpleDispatcher";

import asyncActionBuilder from "../RequestBuilder";
import {
    ACT_CREATE_CATEGORY, ACT_CREATE_DINING_TABLE, ACT_UPDATE_CATEGORY_CREATOR_NAME,
    ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES, ACT_UPDATE_DINING_TABLE_CREATOR_TABLE,
    ACT_UPDATE_DINING_TABLE_CREATOR_WAITER
} from "../ActionTypes";

class DiningTableCreatorActions{

    updateCoverCharges(number){
        dispatcher.fireEnd(ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES, number);
    }

    updateWaiter(waiter){
        dispatcher.fireEnd(ACT_UPDATE_DINING_TABLE_CREATOR_WAITER, waiter);
    }

    updateTable(table) {
        dispatcher.fireEnd(ACT_UPDATE_DINING_TABLE_CREATOR_TABLE, table);
    }

    createDiningTable(table) {
        asyncActionBuilder.post(ACT_CREATE_DINING_TABLE, 'dining-tables', table);
    }


}

const diningTableCreatorActions = new DiningTableCreatorActions();
export default diningTableCreatorActions;