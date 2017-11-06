import asyncActionBuilder from "../actions/RequestBuilder";
import {ACT_RETRIEVE_PRINTER_SERVICES, ACT_RETRIEVE_PRINTERS} from "../actions/ActionTypes";

class PrintersActions {

    retrievePrinterServices() {
        asyncActionBuilder.get(ACT_RETRIEVE_PRINTER_SERVICES, 'printers/services');
    }

    retrievePrinters() {
        asyncActionBuilder.get(ACT_RETRIEVE_PRINTERS, 'printers/printers');
    }

}

const printersActions = new PrintersActions();
export default printersActions;