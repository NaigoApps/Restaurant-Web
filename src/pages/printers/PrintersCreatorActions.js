import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const PrintersCreatorActionTypes = {
    BEGIN_PRINTER_CREATION: "BEGIN_PRINTER_CREATION",
    CREATE_PRINTER: "CREATE_PRINTER",
    ABORT_PRINTER_CREATION: "ABORT_PRINTER_CREATION",
    SET_CREATING_PRINTER_NAME: "SET_CREATING_PRINTER_NAME",
    SET_CREATING_PRINTER_MAIN: "SET_CREATING_PRINTER_MAIN",
    SET_CREATING_PRINTER_LC: "SET_CREATING_PRINTER_LC",
};

export const PrintersCreatorActions = {

    beginPrinterCreation: () =>
        dispatcher.fireEnd(
            PrintersCreatorActionTypes.BEGIN_PRINTER_CREATION
        ),

    //Editor actions

    onConfirm: (printer) =>
        asyncActionBuilder.post(
            PrintersCreatorActionTypes.CREATE_PRINTER,
            'printers',
            printer
        ),

    onAbort: () =>
        dispatcher.fireEnd(
            PrintersCreatorActionTypes.ABORT_PRINTER_CREATION
        ),

    //Name

    confirmName: (uuid, value) =>
        dispatcher.fireEnd(
            PrintersCreatorActionTypes.SET_CREATING_PRINTER_NAME,
            value
        ),

    confirmMain: (uuid, value) =>
        dispatcher.fireEnd(
            PrintersCreatorActionTypes.SET_CREATING_PRINTER_MAIN,
            value
        ),

    confirmLineCharacters: (uuid, value) =>
        dispatcher.fireEnd(
            PrintersCreatorActionTypes.SET_CREATING_PRINTER_LC,
            value
        ),

};