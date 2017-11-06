import AbstractEntityStore from "./AbstractEntityStore";
import {
    ACT_CREATE_PRINTER, ACT_DELETE_PRINTER, ACT_RETRIEVE_PRINTER_SERVICES, ACT_RETRIEVE_PRINTERS,
    ACT_UPDATE_PRINTER
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";

export const EVT_PRINTERS_STORE_CHANGED = "EVT_PRINTERS_STORE_CHANGED";

class PrintersStore extends AbstractEntityStore {
    constructor() {
        super(EVT_PRINTERS_STORE_CHANGED);
        this.services = [];
    }

    getPrinters(){
        return this.getLazyData().getPayload();
    }

    getServices(){
        return this.services;
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