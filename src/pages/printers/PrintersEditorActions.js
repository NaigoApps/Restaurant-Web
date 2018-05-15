import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const PrintersEditorActionTypes = {
    SELECT_EDITING_PRINTER : "SELECT_EDITING_PRINTER",
    DESELECT_EDITING_PRINTER : "DESELECT_EDITING_PRINTER",
    DELETE_EDITING_PRINTER : "DELETE_EDITING_PRINTER",

    UPDATE_EDITING_PRINTER : "UPDATE_EDITING_PRINTER"
};

export const PrintersEditorActions = {

    selectPrinter: (printer) => dispatcher.fireEnd(
        PrintersEditorActionTypes.SELECT_EDITING_PRINTER,
        printer
    ),

    deselectPrinter: () => dispatcher.fireEnd(
        PrintersEditorActionTypes.DESELECT_EDITING_PRINTER
    ),

    confirmName: (uuid, value) =>
        asyncActionBuilder.put(
            PrintersEditorActionTypes.UPDATE_EDITING_PRINTER,
            'printers/' + uuid + '/name',
            value
        ),

    confirmMain: (uuid, value) =>
        asyncActionBuilder.put(
            PrintersEditorActionTypes.UPDATE_EDITING_PRINTER,
            'printers/' + uuid + '/main',
            value
        ),

    confirmLineCharacters: (uuid, value) =>
        asyncActionBuilder.put(
            PrintersEditorActionTypes.UPDATE_EDITING_PRINTER,
            'printers/' + uuid + '/lineCharacters',
            value
        ),

    onDelete: (uuid) =>
        asyncActionBuilder.remove(
            PrintersEditorActionTypes.DELETE_EDITING_PRINTER,
            'printers',
            uuid
        ),
};