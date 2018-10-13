import dispatcher from "../../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../../actions/RequestBuilder";
import {SettingsPageActions} from "../../settings/SettingsPageActions";
import {DataActions} from "../../../actions/DataActions";

export default class EveningSelectorActions {
    static CONFIRM_MONTH = "CONFIRM_MONTH";
    static CONFIRM_YEAR = "CONFIRM_YEAR";
    static CHOOSE = "CHOOSE";

    static confirmMonth(result) {
        dispatcher.fireEnd(this.CONFIRM_MONTH, result);
    }

    static confirmYear(result) {
        dispatcher.fireEnd(this.CONFIRM_YEAR, result);
    }

    static chooseEvening(date) {
        asyncActionBuilder.get(this.CHOOSE, 'evenings', {date: date});
    }
}