import RootFeatureStore from "../../stores/RootFeatureStore";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import applicationStore from "../../stores/ApplicationStore";
import dataStore, {Topics} from "../../stores/DataStore";
import {PrintersPageActionTypes} from "./PrintersPageActions";
import EditorMode from "../../utils/EditorMode";
import Printer from "../../model/Printer";
import {DataActionTypes} from "../../actions/DataActions";
import {Utils} from "../../utils/Utils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";

const EVT_PRINTERS_PAGE_STORE_CHANGED = "EVT_PRINTERS_PAGE_STORE_CHANGED";

class PrintersPageStore extends RootFeatureStore {

    constructor() {
        super(EVT_PRINTERS_PAGE_STORE_CHANGED);
        this.editor = {
            mode: null,
            printer: null,
        };
        this.navigator = {
            page: 0
        };
    }

    getCompletionHandlers() {
        const handlers = {};
        handlers[PrintersPageActionTypes.SELECT_PRINTER_NAVIGATOR_PAGE] = (page) => this.navigator.page = page;
        handlers[PrintersPageActionTypes.SELECT_EDITING_PRINTER] = (printer) => this.initEditor(printer, false);
        handlers[PrintersPageActionTypes.BEGIN_PRINTER_CREATION] = () =>
            this.initEditor(new Printer(EntitiesUtils.newPrinter().toJS(), dataStore.getPool()), true);
        handlers[PrintersPageActionTypes.SET_PRINTER_EDITOR_NAME] = (name) => this.editor.printer.name = name;
        handlers[PrintersPageActionTypes.SET_PRINTER_EDITOR_LCS] = (lcs) => this.editor.printer.lineCharacters = lcs;
        handlers[PrintersPageActionTypes.CREATE_PRINTER] = (printer) =>
            this.initEditor(new Printer(printer.toJS(), dataStore.getPool()), false);
        handlers[PrintersPageActionTypes.UPDATE_EDITING_PRINTER] = (printer) =>
            this.initEditor(new Printer(printer.toJS(), dataStore.getPool()), false);

        handlers[PrintersPageActionTypes.DELETE_EDITING_PRINTER] = () => this.initEditor();

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_PRINTERS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_PRINTER_SERVICES] = () => Utils.nop();
        return handlers;
    }

    getStoreDependencies() {
        return [dataStore, applicationStore];
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

    getState() {
        return {
            data: {
                printers: dataStore.getEntities(Topics.PRINTERS),
                services: dataStore.getEntities(Topics.PRINTER_SERVICES),
                editor: this.editor,
                navigator: this.navigator,

                settings: applicationStore.getSettings()
            }
        }
    }

}

const printersPageStore = new PrintersPageStore();
export default printersPageStore;