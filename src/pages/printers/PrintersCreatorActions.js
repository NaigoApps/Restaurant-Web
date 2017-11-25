import {
    ACT_BEGIN_CREATE_PRINTER, ACT_CREATE_PRINTER, ACT_DESELECT_PRINTER,
    ACT_UPDATE_PRINTER_NAME
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class PrintersCreatorActions {

    beginPrinterCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_PRINTER);
    }

    updatePrinterName(uuid, name) {
        dispatcher.fireEnd(ACT_UPDATE_PRINTER_NAME, name);
    }

    createPrinter(printer) {
        asyncActionBuilder.post(ACT_CREATE_PRINTER, 'printers', printer);
    }

    deselectPrinter(){
        dispatcher.fireEnd(ACT_DESELECT_PRINTER);
    }
}

const printersCreatorActions = new PrintersCreatorActions();
export default printersCreatorActions;