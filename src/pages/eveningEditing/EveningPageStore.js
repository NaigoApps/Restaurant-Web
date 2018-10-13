import AbstractStore from "../../stores/AbstractStore";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";
import EveningEditorActions from "./EveningEditorActions";
import CRUDStatus from "../../utils/CRUDStatus";
import DiningTablesEditorActions from "./diningTableEditing/DiningTablesEditorActions";

const EVT_EVENING_PAGE_STORE_CHANGED = "EVT_EVENING_PAGE_STORE_CHANGED";

export class EveningEditorModes {
    static SELECT = "SELECT";
    static REVIEW = "REVIEW";
    static TABLES = "TABLES";
}

class EveningPageStore extends AbstractStore {

    constructor() {
        super("eveningPage", EVT_EVENING_PAGE_STORE_CHANGED,
            applicationStore,
            dataStore);
    }

    getActionCompletedHandlers() {
        const handlers = {};
        return handlers;
    }

    buildState() {
        return {};
    }

}

const eveningPageStore = new EveningPageStore();
export default eveningPageStore;