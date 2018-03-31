import {
    ACT_DELETE_PRINTER, ACT_DESELECT_PRINTER, ACT_PRINTER_EDITOR_NAME_ABORT, ACT_PRINTER_EDITOR_SET_NAME,
    ACT_PRINTER_EDITOR_SET_NAME_PAGE,
    ACT_PRINTER_EDITOR_NAME_START,
    ACT_SELECT_PRINTER,
    ACT_UPDATE_PRINTER, ACT_UPDATE_PRINTER_MAIN, ACT_UPDATE_PRINTER_NAME, ACT_PRINTER_EDITOR_LC_START,
    ACT_PRINTER_EDITOR_LC_CHAR, ACT_PRINTER_EDITOR_LC_ABORT, ACT_UPDATE_PRINTER_LC
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class PrintersEditorActions {

    //General actions

    selectPrinter(printer) {
        dispatcher.fireEnd(ACT_SELECT_PRINTER, printer);
    }

    deselectPrinter(){
        dispatcher.fireEnd(ACT_DESELECT_PRINTER);
    }

    //Editor actions

    onDelete(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_PRINTER, 'printers', uuid);
    }

    //Name

    onStartNameEditing(){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_NAME_START);
    }

    onSelectName(value){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_SET_NAME, value);
    }

    onSelectNamePage(value){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_SET_NAME_PAGE, value);
    }

    //LCs

    onStartLineCharactersEditing(){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_LC_START);
    }

    onLineCharactersChar(char){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_LC_CHAR, char);
    }

    //EDITOR_INTERFACE

    onAbortNameEditing(){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_NAME_ABORT);
    }

    onConfirmNameEditing(uuid, value){
        asyncActionBuilder.put(
            ACT_UPDATE_PRINTER_NAME,
            'printers/' + uuid + '/name',
            value
        );
    }

    onConfirmMainEditing(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_PRINTER_MAIN,
            'printers/' + uuid + '/main',
            value
        );
    }

    onConfirmLineCharactersEditing(uuid, value){
        asyncActionBuilder.put(
            ACT_UPDATE_PRINTER_LC,
            'printers/' + uuid + '/lineCharacters',
            value
        );
    }

    onAbortLineCharactersEditing(){
        dispatcher.fireEnd(ACT_PRINTER_EDITOR_LC_ABORT);
    }

}

const printersEditorActions = new PrintersEditorActions();
export default printersEditorActions;