import asyncActionBuilder from '../../actions/RequestBuilder';
import dispatcher from "../../dispatcher/SimpleDispatcher";

export default class EveningEditorActions {

    static GET_SELECTED = "GET_SELECTED";
    static DESELECT_EVENING = "DESELECT_EVENING";
    static CONFIRM_COVER_CHARGE_EDITING = "CONFIRM_COVER_CHARGE_EDITING";

    static SELECT_DINING_TABLE = "SELECT_DINING_TABLE";
    static SELECT_DINING_TABLE_PAGE = "SELECT_DINING_TABLE_PAGE";

    static SHOW_EVENING_REVIEW = "SHOW_EVENING_REVIEW";
    static LOAD_EVENING_TABLES = "LOAD_EVENING_TABLES";

    static getSelectedEvening() {
        asyncActionBuilder.get(
            this.GET_SELECTED,
            "evenings/selected");
    }

    static selectPage(page) {
        dispatcher.fireEnd(this.SELECT_DINING_TABLE_PAGE, page);
    }

    static selectDiningTable(table) {
        dispatcher.fireEnd(this.SELECT_DINING_TABLE, table);
    }

    static deselectEvening() {
        dispatcher.fireEnd(this.DESELECT_EVENING);
    }

    static showReview() {
        dispatcher.fireEnd(this.SHOW_EVENING_REVIEW);
    }

    static showTables(){
        asyncActionBuilder.get(
            this.LOAD_EVENING_TABLES,
            'dining-tables'
        );
    }

    //COVER CHARGE EDITING
    static confirmCoverCharge(uuid, value) {
        asyncActionBuilder.put(
            this.CONFIRM_COVER_CHARGE_EDITING,
            'evenings/' + uuid + "/coverCharge",
            value
        );
    }

}