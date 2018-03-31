import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_PRINTER,
    ACT_CREATE_PRINTER,
    ACT_DELETE_PRINTER,
    ACT_DESELECT_PRINTER, ACT_PRINTER_CREATOR_LC_ABORT, ACT_PRINTER_CREATOR_NAME_ABORT,
    ACT_PRINTER_EDITOR_LC_ABORT,
    ACT_PRINTER_EDITOR_LC_CHAR,
    ACT_PRINTER_EDITOR_LC_START,
    ACT_PRINTER_EDITOR_NAME_ABORT,
    ACT_PRINTER_EDITOR_NAME_START,
    ACT_PRINTER_EDITOR_SET_NAME,
    ACT_PRINTERS_PAGE_SELECT_PAGE,
    ACT_RETRIEVE_PRINTER_SERVICES,
    ACT_RETRIEVE_PRINTERS,
    ACT_SELECT_PRINTER,
    ACT_UPDATE_PRINTER_CREATOR_LC,
    ACT_UPDATE_PRINTER_CREATOR_MAIN,
    ACT_UPDATE_PRINTER_CREATOR_NAME,
    ACT_UPDATE_PRINTER_LC,
    ACT_UPDATE_PRINTER_MAIN,
    ACT_UPDATE_PRINTER_NAME
} from "../../actions/ActionTypes";
import printersStore from "../../stores/generic/PrintersStore";
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";
import {appendIntEditorChar, findByUuid, iGet, iSet} from "../../utils/Utils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import StoresUtils, {EditorStatus} from "../StoresUtils";

const {fromJS, Map} = require('immutable');

const EVT_PRINTERS_PAGE_STORE_CHANGED = "EVT_PRINTERS_PAGE_STORE_CHANGED";

class PrintersPageStore extends AbstractStore {

    constructor() {
        super(EVT_PRINTERS_PAGE_STORE_CHANGED);
        this.page = 0;
        this.printer = null;
        this.editor = this.resetPrinterEditor();
        this.status = EditorStatus.SURFING;
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([printersStore.getToken()]);

        let changed = AbstractEntityStore.areLoaded([printersStore]);

        switch (action.type) {
            case ACT_RETRIEVE_PRINTER_SERVICES:
            case ACT_RETRIEVE_PRINTERS:
                break;
            case ACT_PRINTERS_PAGE_SELECT_PAGE:
                this.page = action.body;
                break;
            case ACT_DESELECT_PRINTER:
            case ACT_DELETE_PRINTER:
                this.status = EditorStatus.SURFING;
                break;
            case ACT_BEGIN_CREATE_PRINTER:
                this.status = EditorStatus.CREATING;
                this.printer = EntitiesUtils.newPrinter();
                this.editor = this.resetPrinterEditor();
                break;
            case ACT_UPDATE_PRINTER_NAME:
            case ACT_UPDATE_PRINTER_MAIN:
            case ACT_UPDATE_PRINTER_LC:
            case ACT_CREATE_PRINTER:
                this.status = EditorStatus.EDITING;
                this.printer = action.body.get('uuid');
                this.editor = this.resetPrinterEditor();
                break;
            case ACT_SELECT_PRINTER:
                this.status = EditorStatus.EDITING;
                this.printer = action.body;
                this.editor = this.resetPrinterEditor();
                break;
            case ACT_PRINTER_EDITOR_NAME_START: {
                let name = this.getSelectedPrinter().get('name');
                this.editor = iSet(this.editor, "name", StoresUtils.initSelectEditor(name));
                break;
            }
            case ACT_PRINTER_CREATOR_NAME_ABORT:
            case ACT_PRINTER_EDITOR_NAME_ABORT: {
                let name = this.getSelectedPrinter().get('name');
                this.editor = iSet(this.editor, "name", StoresUtils.initSelectEditor(name));
                this.editor = iSet(this.editor, "name.visible", false);
                break;
            }
            case ACT_PRINTER_EDITOR_SET_NAME:
                this.editor = iSet(this.editor, "name.value", action.body);
                break;
            case ACT_PRINTER_EDITOR_LC_START: {
                let lines = this.getSelectedPrinter().get('lineCharacters');
                this.editor = iSet(this.editor, "lineCharacters", StoresUtils.initIntEditor(lines));
                break;
            }
            case ACT_PRINTER_CREATOR_LC_ABORT:
            case ACT_PRINTER_EDITOR_LC_ABORT: {
                let lines = this.getSelectedPrinter().get('lineCharacters');
                this.editor = iSet(this.editor, "lineCharacters", StoresUtils.initIntEditor(lines));
                this.editor = iSet(this.editor, "lineCharacters.visible", false);
                break;
            }
            case ACT_PRINTER_EDITOR_LC_CHAR: {
                let oldValue = iGet(this.editor, "lineCharacters.text");
                this.editor = iSet(this.editor, "lineCharacters.text",
                    appendIntEditorChar(oldValue, action.body));
                break;
            }
            case ACT_UPDATE_PRINTER_CREATOR_NAME:
                this.printer = iSet(this.printer, "name", action.body);
                this.editor = this.resetPrinterEditor();
                break;
            case ACT_UPDATE_PRINTER_CREATOR_MAIN:
                this.printer = iSet(this.printer, "main", action.body);
                this.editor = this.resetPrinterEditor();
                break;
            case ACT_UPDATE_PRINTER_CREATOR_LC:
                this.printer = iSet(this.printer, "lineCharacters", action.body);
                this.editor = this.resetPrinterEditor();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    resetPrinterEditor() {
        let printer = this.getSelectedPrinter();
        return fromJS({
            name: {
                visible: false,
                value: printer ? printer.get('name') : null,
                page: 0
            },
            main: {
                value: printer ? printer.get('main') : false
            },
            lineCharacters: {
                visible: false,
                text: printer ? printer.get('lineCharacters').toString() : ""
            }
        });
    }

    selectPrinter(uuid) {
        let selectedPrinter = this.getSelectedPrinter();
        this.editor = iSet(this.editor, "name.value", selectedPrinter.get("name"));
        this.editor = iSet(this.editor, "main.value", selectedPrinter.get('main'));
        this.editor = iSet(this.editor, "lineCharacters.text",
            selectedPrinter.get('lineCharacters').toString());
    }

    getSelectedPrinter() {
        if (this.status === EditorStatus.EDITING) {
            return findByUuid(printersStore.getPrinters().getPayload(), this.printer);
        } else if (this.status === EditorStatus.CREATING) {
            return this.printer;
        }
        return null;
    }

    getState() {
        let result = Map({
            printers: printersStore.getPrinters().getPayload(),
            services: printersStore.getServices(),
            printer: this.getSelectedPrinter(),
            editor: this.editor,
            page: this.page,
            status: this.status
        });
        return {
            data: result
        }
    }

}

const printersPageStore = new PrintersPageStore();
export default printersPageStore;