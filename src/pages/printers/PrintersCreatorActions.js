import {
    ACT_BEGIN_CREATE_PRINTER,
    ACT_CREATE_PRINTER,
    ACT_DESELECT_PRINTER,
    ACT_PRINTER_CREATOR_LC_ABORT,
    ACT_PRINTER_CREATOR_NAME_ABORT,
    ACT_UPDATE_PRINTER_CREATOR_LC,
    ACT_UPDATE_PRINTER_CREATOR_MAIN,
    ACT_UPDATE_PRINTER_CREATOR_NAME
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class PrintersCreatorActions {

    beginPrinterCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_PRINTER);
    }

    //Editor actions

    onConfirm(printer) {
        asyncActionBuilder.post(ACT_CREATE_PRINTER, 'printers', printer);
    }

    onAbort(){
        dispatcher.fireEnd(ACT_DESELECT_PRINTER);
    }

    //Name

    onAbortNameEditing(){
        dispatcher.fireEnd(ACT_PRINTER_CREATOR_NAME_ABORT);
    }

    onConfirmNameEditing(uuid, value){
        dispatcher.fireEnd(ACT_UPDATE_PRINTER_CREATOR_NAME, value);
    }

    onConfirmMainEditing(uuid, value) {
        dispatcher.fireEnd(ACT_UPDATE_PRINTER_CREATOR_MAIN, value);
    }

    onConfirmLineCharactersEditing(uuid, value){
        dispatcher.fireEnd(ACT_UPDATE_PRINTER_CREATOR_LC, value);
    }

    onAbortLineCharactersEditing(){
        dispatcher.fireEnd(ACT_PRINTER_CREATOR_LC_ABORT);
    }
}

const printersCreatorActions = new PrintersCreatorActions();
export default printersCreatorActions;