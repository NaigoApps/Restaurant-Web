import dispatcher from "../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../actions/RequestBuilder";
import {ACT_DESELECT_EVENING, ACT_SELECT_EVENING, ACT_UPDATE_EVENING_DATE} from "../../../actions/ActionTypes";

const {fromJS} = require('immutable');

export const Actions = {
    ACT_SELECT_EVENING_MONTH: "ACT_SELECT_EVENING_MONTH",
    ACT_START_EVENING_MONTH_EDITING: "ACT_START_EVENING_MONTH_EDITING",
    ACT_ABORT_EVENING_MONTH_EDITING: "ACT_ABORT_EVENING_MONTH_EDITING",
    ACT_CONFIRM_EVENING_MONTH_EDITING: "ACT_CONFIRM_EVENING_MONTH_EDITING",
    ACT_START_EVENING_YEAR_EDITING: "ACT_START_EVENING_YEAR_EDITING",
    ACT_EVENING_YEAR_CHANGE: "ACT_EVENING_YEAR_CHANGE",
    ACT_EVENING_YEAR_CHAR: "ACT_EVENING_YEAR_CHAR",
    ACT_CONFIRM_EVENING_YEAR_EDITING: "ACT_CONFIRM_EVENING_YEAR_EDITING",
    ACT_ABORT_EVENING_YEAR_EDITING: "ACT_ABORT_EVENING_YEAR_EDITING"
};

class EveningSelectorActions {

    onSelectMonth(value) {
        dispatcher.fireEnd(Actions.ACT_SELECT_EVENING_MONTH, value);
    }

    onStartMonthEditing() {
        dispatcher.fireEnd(Actions.ACT_START_EVENING_MONTH_EDITING);
    }

    onAbortMonthEditing() {
        dispatcher.fireEnd(Actions.ACT_ABORT_EVENING_MONTH_EDITING);
    }

    onConfirmMonthEditing(result) {
        dispatcher.fireEnd(Actions.ACT_CONFIRM_EVENING_MONTH_EDITING, result);
    }

    onStartDayEditing() {
        dispatcher.fireEnd(Actions.ACT_START_EVENING_YEAR_EDITING);
    }

    onDayChange(text) {
        dispatcher.fireEnd(Actions.ACT_EVENING_YEAR_CHANGE, text);
    }

    onDayChar(char) {
        dispatcher.fireEnd(Actions.ACT_EVENING_YEAR_CHAR, char);
    }

    onConfirmDayEditing(result) {
        dispatcher.fireEnd(Actions.ACT_CONFIRM_EVENING_YEAR_EDITING, result);
    }

    onAbortDayEditing() {
        dispatcher.fireEnd(Actions.ACT_ABORT_EVENING_YEAR_EDITING);
    }

    updateEveningDate(date) {
        dispatcher.fireEnd(ACT_UPDATE_EVENING_DATE, date);
    }

    chooseEvening(date) {
        asyncActionBuilder.get(ACT_SELECT_EVENING, 'evenings', {date: date});
    }

    deselectEvening() {
        dispatcher.fireEnd(ACT_DESELECT_EVENING);
    }

}

const eveningSelectionFormActions = new EveningSelectorActions();

export default eveningSelectionFormActions;