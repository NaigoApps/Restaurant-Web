import AbstractStore from "../../stores/AbstractStore";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import applicationStore from "../../stores/ApplicationStore";
import dataStore from "../../stores/DataStore";
import {PrintersPageActionTypes} from "./PrintersPageActions";
import EditorMode from "../../utils/EditorMode";
import Printer from "../../model/Printer";
import {DataActionTypes} from "../../actions/DataActions";
import {Utils} from "../../utils/Utils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";

const EVT_PRINTERS_PAGE_STORE_CHANGED = "EVT_PRINTERS_PAGE_STORE_CHANGED";

class PrintersPageStore extends AbstractStore {

    constructor() {
        super("printers", EVT_PRINTERS_PAGE_STORE_CHANGED, applicationStore, dataStore);
        this.editor = {
            mode: null,
            printer: null,
        };
        this.navigator = {
            page: 0
        };
    }

    getActionsClass() {
        return PrintersPageActionTypes;
    }

    getActionCompletedHandlers() {
        const handlers = {};
        handlers[PrintersPageActionTypes.SELECT_PRINTER_NAVIGATOR_PAGE] = (page) => this.navigator.page = page;
        handlers[PrintersPageActionTypes.SELECT_EDITING_PRINTER] = (printer) => this.initEditor(printer, false);
        handlers[PrintersPageActionTypes.BEGIN_PRINTER_CREATION] = () =>
            this.initEditor(new Printer(EntitiesUtils.newPrinter(), dataStore.getPool()), true);
        handlers[PrintersPageActionTypes.SET_PRINTER_EDITOR_NAME] = (name) => this.editor.printer.name = name;
        handlers[PrintersPageActionTypes.SET_PRINTER_EDITOR_LCS] = (lcs) => this.editor.printer.lineCharacters = lcs;
        handlers[PrintersPageActionTypes.CREATE_PRINTER] = (printer) =>
            this.initEditor(new Printer(printer, dataStore.getPool()), false);
        handlers[PrintersPageActionTypes.UPDATE_EDITING_PRINTER] = (printer) =>
            this.initEditor(new Printer(printer, dataStore.getPool()), false);

        handlers[PrintersPageActionTypes.DELETE_EDITING_PRINTER] = () => this.initEditor();

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_PRINTERS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_PRINTER_SERVICES] = () => Utils.nop();
        return handlers;
    }

    initEditor(printer, creating) {
        this.editor = {
            mode: null,
            printer: null
        };
        if (printer) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.printer = printer;
        }
    }

    buildState() {
        return {
            editor: this.editor,
            navigator: this.navigator,
        }
    }

}

const printersPageStore = new PrintersPageStore();
export default printersPageStore;