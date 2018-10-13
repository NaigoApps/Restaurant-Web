import {DataActions} from "../../actions/DataActions";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";

export class SettingsPageActions {
    static initSettingsPage() {
        this.loadSettings();
        DataActions.loadPrinters();
    }

    static loadSettings() {
        asyncActionBuilder.get(ApplicationActionTypes.LOAD_SETTINGS, "settings");
    }

    static storeClientSettings(value) {
        asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/client", JSON.stringify(value));
    }

    static setMainPrinter(printer) {
        asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/main-printer", printer);
    }

    static setFiscalPrinter(printer) {
        asyncActionBuilder.put(ApplicationActionTypes.STORE_SETTINGS, "settings/fiscal-printer", printer);
    }

}