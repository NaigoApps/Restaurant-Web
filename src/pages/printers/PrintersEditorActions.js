import {
    ACT_DELETE_PRINTER, ACT_DESELECT_PRINTER, ACT_SELECT_PRINTER,
    ACT_UPDATE_PRINTER
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class PrintersEditorActions {

    selectPrinter(printer) {
        dispatcher.fireEnd(ACT_SELECT_PRINTER, printer);
    }

    deselectPrinter(){
        dispatcher.fireEnd(ACT_DESELECT_PRINTER);
    }

    updatePrinterName(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_PRINTER,
            'printers/' + uuid + '/name',
            value
        );
    }

    deletePrinter(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_PRINTER, 'printers', uuid);
    }

}

const printersEditorActions = new PrintersEditorActions();
export default printersEditorActions;