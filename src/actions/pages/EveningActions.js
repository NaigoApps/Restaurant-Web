import asyncActionBuilder from "../RequestBuilder";
import {
    ACT_RETRIEVE_ACTIVE_WAITERS,
    ACT_RETRIEVE_CURRENT_MENU,
    ACT_RETRIEVE_RESTAURANT_TABLES, ACT_RETRIEVE_WAITERS, ACT_SELECT_EVENING,
    ACT_UPDATE_EVENING, ACT_UPDATE_EVENING_COVER_CHARGE
} from "../ActionTypes";
import diningTablesActions from "../../pages/evening/DiningTablesActions";

class EveningActions {

    updateEveningCoverCharge(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_EVENING, "evenings/" + uuid + "/coverCharge", value);
    }

    reloadWaiters() {
        asyncActionBuilder.get(
            ACT_RETRIEVE_WAITERS,
            'waiters/active'
        )
    }

    reloadTables() {
        asyncActionBuilder.get(
            ACT_RETRIEVE_RESTAURANT_TABLES,
            'restaurant-tables'
        )
    }

    reloadCurrentMenu() {
        asyncActionBuilder.get(
            ACT_RETRIEVE_CURRENT_MENU,
            'categories/menu'
        )
    }

    retrieveSelectedEvening() {
        asyncActionBuilder.get(ACT_SELECT_EVENING, 'evenings/selected')
            .then(diningTablesActions.retrieveDiningTables);
    }

    printTest() {
        asyncActionBuilder.get(
            "foo",
            "evenings/print",
            {text: "test"}
        )
    }

}

const eveningActions = new EveningActions();

export default eveningActions;