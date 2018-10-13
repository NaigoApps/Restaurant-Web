import EveningSelectorActions, {EveningSelectorActionTypes} from "./EveningSelectorActions";
import AbstractStore from "../../../stores/AbstractStore";
import applicationStore from "../../../stores/ApplicationStore";
import {ApplicationActionTypes} from "../../../actions/ApplicationActions";
import {Pages} from "../../../App";

const EVENING_SELECTOR_CHANGED = "EVENING_SELECTOR_CHANGED";

class EveningSelectorStore extends AbstractStore {

    constructor() {
        super("eveningSelection", EVENING_SELECTOR_CHANGED, applicationStore);
        let date = new Date();
        this.month = date.getMonth();
        this.year = date.getFullYear();
    }

    buildState() {
        return {
            month: this.month,
            year: this.year
        };
    }

    getActionsClass(){
        return EveningSelectorActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};

        handlers[EveningSelectorActions.CONFIRM_MONTH] = (month) => this.month = month;
        handlers[EveningSelectorActions.CONFIRM_YEAR] = (year) => this.year = year;

        return handlers;
    }
}

const eveningSelectorStore = new EveningSelectorStore();
export default eveningSelectorStore;