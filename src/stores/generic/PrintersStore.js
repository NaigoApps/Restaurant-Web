import AbstractEntityStore from "./AbstractEntityStore";
import {
    ACT_CREATE_PRINTER, ACT_DELETE_PRINTER, ACT_RETRIEVE_PRINTER_SERVICES, ACT_RETRIEVE_PRINTERS,
    ACT_UPDATE_PRINTER, ACT_UPDATE_PRINTER_LC, ACT_UPDATE_PRINTER_MAIN, ACT_UPDATE_PRINTER_NAME
} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";

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
            case ACT_CREATE_PRINTER:
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
            case ACT_UPDATE_PRINTER:
            case ACT_UPDATE_PRINTER_NAME:
            case ACT_UPDATE_PRINTER_MAIN:
            case ACT_UPDATE_PRINTER_LC:
                this.updateData(action.body);
                break;
            case ACT_DELETE_PRINTER:
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