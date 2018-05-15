import RootFeatureStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_PRINTERS_PAGE_SELECT_PAGE,
    ACT_RETRIEVE_PRINTER_SERVICES,
    ACT_RETRIEVE_PRINTERS,
} from "../../actions/ActionTypes";
import printersStore from "../../stores/generic/PrintersStore";
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";
import {findByUuid, iSet} from "../../utils/Utils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {EditorStatus} from "../StoresUtils";
import {PrintersEditorActionTypes} from "./PrintersEditorActions";
import {PrintersCreatorActionTypes} from "./PrintersCreatorActions";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {fromJS, Map} = require('immutable');

const EVT_PRINTERS_PAGE_STORE_CHANGED = "EVT_PRINTERS_PAGE_STORE_CHANGED";

class PrintersPageStore extends RootFeatureStore {

    constructor() {
        super(EVT_PRINTERS_PAGE_STORE_CHANGED);
        this.page = 0;
        this.printer = null;
        this.status = EditorStatus.SURFING;
    }

    handleCompletedAction(action) {
        dispatcher.waitFor([printersStore.getToken(), applicationStore.getToken()]);

        let changed = AbstractEntityStore.areLoaded([printersStore]);

        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_PRINTER_SERVICES:
            case ACT_RETRIEVE_PRINTERS:
                break;
            case ACT_PRINTERS_PAGE_SELECT_PAGE:
                this.page = action.body;
                break;
            case PrintersEditorActionTypes.DESELECT_EDITING_PRINTER:
            case PrintersEditorActionTypes.DELETE_EDITING_PRINTER:
            case PrintersCreatorActionTypes.ABORT_PRINTER_CREATION:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.status = EditorStatus.SURFING;
                break;
            case PrintersCreatorActionTypes.BEGIN_PRINTER_CREATION:
                this.status = EditorStatus.CREATING;
                this.printer = EntitiesUtils.newPrinter();
                break;
            case PrintersEditorActionTypes.UPDATE_EDITING_PRINTER:
            case PrintersCreatorActionTypes.CREATE_PRINTER:
                this.status = EditorStatus.EDITING;
                this.printer = action.body.get('uuid');
                break;
            case PrintersEditorActionTypes.SELECT_EDITING_PRINTER:
                this.status = EditorStatus.EDITING;
                this.printer = action.body;
                break;
            case PrintersCreatorActionTypes.SET_CREATING_PRINTER_NAME:
                this.printer = iSet(this.printer, "name", action.body);
                break;
            case PrintersCreatorActionTypes.SET_CREATING_PRINTER_MAIN:
                this.printer = iSet(this.printer, "main", action.body);
                break;
            case PrintersCreatorActionTypes.SET_CREATING_PRINTER_LC:
                this.printer = iSet(this.printer, "lineCharacters", action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
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
            status: this.status,

            settings: applicationStore.getSettings()
        });
        return {
            data: result
        }
    }

}

const printersPageStore = new PrintersPageStore();
export default printersPageStore;