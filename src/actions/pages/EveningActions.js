import asyncActionBuilder from "../RequestBuilder";
import {
    ACT_ASK_SELECTED_EVENING, ACT_BEGIN_ENTITY_EDITING,
    ACT_RETRIEVE_CURRENT_MENU,
    ACT_RETRIEVE_RESTAURANT_TABLES,
    ACT_RETRIEVE_WAITERS,
    ACT_UPDATE_EVENING
} from "../ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {EVENING_TYPE} from "../../stores/EntityEditorStore";

const {fromJS} = require('immutable');

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
        asyncActionBuilder.get(ACT_ASK_SELECTED_EVENING, 'evenings/selected')
            .then((evening) => dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                type: EVENING_TYPE,
                entity: evening
            })));
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