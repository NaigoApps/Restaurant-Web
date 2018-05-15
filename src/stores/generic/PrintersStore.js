import AbstractEntityStore from "./AbstractEntityStore";
import {
    ACT_RETRIEVE_PRINTER_SERVICES,
    ACT_RETRIEVE_PRINTERS
} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import {PrintersCreatorActionTypes} from "../../pages/printers/PrintersCreatorActions";
import {PrintersEditorActionTypes} from "../../pages/printers/PrintersEditorActions";

const {fromJS, List} = require('immutable');

export const EVT_PRINTERS_STORE_CHANGED = "EVT_PRINTERS_STORE_CHANGED";

class PrintersStore extends AbstractEntityStore {
    constructor() {
        super(EVT_PRINTERS_STORE_CHANGED);
        this.services = List();
    }

    getPrinters(){
        return this.getData();
    }

    getServices(){
        return this.services;
    }

    comparator(p1, p2){
        return p1.get('name').toLowerCase().localeCompare(p2.get('name').toLowerCase());
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
            case ACT_RETRIEVE_PRINTER_SERVICES:
            case ACT_RETRIEVE_PRINTERS:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case PrintersCreatorActionTypes.CREATE_PRINTER:
                this.createData(action.body);
                break;
            case ACT_RETRIEVE_PRINTERS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_RETRIEVE_PRINTER_SERVICES:
                this.services = action.body;
                this.setStatus(STATUSES.LOADED);
                break;
            case PrintersEditorActionTypes.UPDATE_EDITING_PRINTER:
                this.updateData(action.body);
                break;
            case PrintersEditorActionTypes.DELETE_EDITING_PRINTER:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const printersStore = new PrintersStore();
export default printersStore;