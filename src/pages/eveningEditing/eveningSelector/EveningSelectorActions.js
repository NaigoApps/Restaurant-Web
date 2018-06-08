import dispatcher from "../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../actions/RequestBuilder";

const {fromJS} = require('immutable');

export const EveningSelectorActionTypes = {
    SELECT_MONTH: "SELECT_MONTH",
    BEGIN_MONTH: "BEGIN_MONTH",
    ABORT_MONTH: "ABORT_MONTH",
    CONFIRM_MONTH: "CONFIRM_MONTH",
    BEGIN_YEAR: "BEGIN_YEAR",
    YEAR_CHANGE: "YEAR_CHANGE",
    YEAR_CHAR: "YEAR_CHAR",
    CONFIRM_YEAR: "CONFIRM_YEAR",
    ABORT_YEAR: "ABORT_YEAR",
    CHOOSE: "CHOOSE",
};

export const EveningSelectorActions = {

    //Month
    selectMonth: (value) => dispatcher.fireEnd(EveningSelectorActionTypes.SELECT_MONTH, value),
    beginMonth: () => dispatcher.fireEnd(EveningSelectorActionTypes.BEGIN_MONTH),
    abortMonth: () => dispatcher.fireEnd(EveningSelectorActionTypes.ABORT_MONTH),
    confirmMonth: (result) => dispatcher.fireEnd(EveningSelectorActionTypes.CONFIRM_MONTH, result),

    //Year
    beginYear: () => dispatcher.fireEnd(EveningSelectorActionTypes.BEGIN_YEAR),
    yearChange: (text) => dispatcher.fireEnd(EveningSelectorActionTypes.YEAR_CHANGE, text),
    yearChar: (char) => dispatcher.fireEnd(EveningSelectorActionTypes.YEAR_CHAR, char),
    confirmYear: (result) => dispatcher.fireEnd(EveningSelectorActionTypes.CONFIRM_YEAR, result),
    abortYear: () => dispatcher.fireEnd(EveningSelectorActionTypes.ABORT_YEAR),

    chooseEvening : (date) => asyncActionBuilder.get(EveningSelectorActionTypes.CHOOSE, 'evenings', {date: date})
};