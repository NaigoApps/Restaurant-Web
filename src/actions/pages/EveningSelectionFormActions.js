import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_BEGIN_ENTITY_EDITING,
    ACT_SELECT_EVENING,
    ACT_UPDATE_EVENING_DATE
} from "../ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../RequestBuilder";
import {EVENING_TYPE} from "../../stores/EntityEditorStore";

const {fromJS} = require('immutable');

class EveningSelectionFormActions {

    updateEveningDate(date) {
        dispatcher.fireEnd(ACT_UPDATE_EVENING_DATE, date);
    }

    chooseEvening(date) {
        asyncActionBuilder.get(ACT_SELECT_EVENING, 'evenings', {date: date})
            .then((evening) => dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                type: EVENING_TYPE,
                entity: evening
            })));
    }

    deselectEvening() {
        dispatcher.fireEnd(ACT_ABORT_ENTITY_EDITING, EVENING_TYPE);
    }

    printTest() {
        asyncActionBuilder.get(
            "foo",
            "evenings/print",
            {text: "test"}
        )
    }

}

const eveningSelectionFormActions = new EveningSelectionFormActions();

export default eveningSelectionFormActions;