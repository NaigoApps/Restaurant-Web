import {
    ACT_ABORT_ENTITY_EDITING,
    ACT_ABORT_EVENING_MONTH_EDITING, ACT_ABORT_EVENING_YEAR_EDITING,
    ACT_BEGIN_ENTITY_EDITING, ACT_CONFIRM_EVENING_MONTH_EDITING, ACT_CONFIRM_EVENING_YEAR_EDITING, ACT_DESELECT_EVENING,
    ACT_EVENING_YEAR_CHAR,
    ACT_SELECT_EVENING,
    ACT_SELECT_EVENING_MONTH,
    ACT_START_EVENING_MONTH_EDITING, ACT_START_EVENING_YEAR_EDITING,
    ACT_UPDATE_EVENING_DATE
} from "../ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../RequestBuilder";
import {EVENING_TYPE} from "../../stores/EntityEditorStore";

const {fromJS} = require('immutable');

class EveningSelectionFormActions {

    onSelectMonth(value) {
        dispatcher.fireEnd(ACT_SELECT_EVENING_MONTH, value);
    }

    onStartMonthEditing() {
        dispatcher.fireEnd(ACT_START_EVENING_MONTH_EDITING);
    }

    onAbortMonthEditing() {
        dispatcher.fireEnd(ACT_ABORT_EVENING_MONTH_EDITING);
    }

    onConfirmMonthEditing(result) {
        dispatcher.fireEnd(ACT_CONFIRM_EVENING_MONTH_EDITING, result);
    }

    onStartDayEditing() {
        dispatcher.fireEnd(ACT_START_EVENING_YEAR_EDITING);
    }

    onDayChar(char) {
        dispatcher.fireEnd(ACT_EVENING_YEAR_CHAR, char);
    }

    onConfirmDayEditing(result) {
        dispatcher.fireEnd(ACT_CONFIRM_EVENING_YEAR_EDITING, result);
    }

    onAbortDayEditing() {
        dispatcher.fireEnd(ACT_ABORT_EVENING_YEAR_EDITING);
    }

    updateEveningDate(date) {
        dispatcher.fireEnd(ACT_UPDATE_EVENING_DATE, date);
    }

    chooseEvening(date) {
        asyncActionBuilder.get(ACT_SELECT_EVENING, 'evenings', {date: date})
            .then((evening) => dispatcher.fireEnd(ACT_BEGIN_ENTITY_EDITING, fromJS({
                type: EVENING_TYPE,
                entity: evening.get('uuid')
            })));
    }

    deselectEvening() {
        dispatcher.fireEnd(ACT_DESELECT_EVENING);
    }

}

const eveningSelectionFormActions = new EveningSelectionFormActions();

export default eveningSelectionFormActions;