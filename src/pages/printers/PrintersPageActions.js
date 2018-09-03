import dispatcher from "../../dispatcher/SimpleDispatcher";
import {ApplicationActions} from "../../actions/ApplicationActions";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

export class PrintersPageActionTypes {
    static SELECT_EDITING_PRINTER = "SELECT_EDITING_PRINTER";
    static SELECT_PRINTER_NAVIGATOR_PAGE = "SELECT_PRINTER_NAVIGATOR_PAGE";

    static UPDATE_EDITING_PRINTER = "UPDATE_EDITING_PRINTER";
    static DELETE_EDITING_PRINTER = "DELETE_EDITING_PRINTER";

    static BEGIN_PRINTER_CREATION = "BEGIN_PRINTER_CREATION";
    static SET_PRINTER_EDITOR_NAME = "SET_PRINTER_EDITOR_NAME";
    static SET_PRINTER_EDITOR_LCS = "SET_PRINTER_EDITOR_LCS";
    static CREATE_PRINTER = "CREATE_PRINTER";
}

export class PrintersPageActions {

    static initPrintersPage() {
        SettingsPageActions.loadSettings();
        DataActions.loadPrinterServices();
        DataActions.loadPrinters();
    }

    static selectPrinterNavigatorPage(index) {
        dispatcher.fireEnd(PrintersPageActionTypes.SELECT_PRINTER_NAVIGATOR_PAGE, index);
    }

    static beginPrinterCreation() {
        dispatcher.fireEnd(
            PrintersPageActionTypes.BEGIN_PRINTER_CREATION
        );
    }

    static setEditorName(name) {
        dispatcher.fireEnd(
            PrintersPageActionTypes.SET_PRINTER_EDITOR_NAME,
            name
        );
    }

    static setEditorLCs(lcs) {
        dispatcher.fireEnd(
            PrintersPageActionTypes.SET_PRINTER_EDITOR_LCS,
            lcs
        );
    }

    static createPrinter(printer) {
        asyncActionBuilder.post(
            PrintersPageActionTypes.CREATE_PRINTER,
            'printers',
            printer.toDto()
        );
    }

    static selectPrinter(printer) {
        dispatcher.fireEnd(PrintersPageActionTypes.SELECT_EDITING_PRINTER, printer);
    }

    static setPrinterName(uuid, name) {
        asyncActionBuilder.put(
            PrintersPageActionTypes.UPDATE_EDITING_PRINTER,
            'printers/' + uuid + '/name',
            name
        );
    }

    static setPrinterLineCharacters(uuid, lcs) {
        asyncActionBuilder.put(
            PrintersPageActionTypes.UPDATE_EDITING_PRINTER,
            'printers/' + uuid + '/lineCharacters',
            lcs
        );
    }

    static deletePrinter(printer) {
        asyncActionBuilder.remove(
            PrintersPageActionTypes.DELETE_EDITING_PRINTER,
            'printers',
            printer.uuid
        );
    }

}