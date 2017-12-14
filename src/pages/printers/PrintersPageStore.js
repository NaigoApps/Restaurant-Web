import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_PRINTER,
    ACT_CREATE_PRINTER,
    ACT_DELETE_PRINTER,
    ACT_DESELECT_PRINTER,
    ACT_RETRIEVE_PRINTER_SERVICES,
    ACT_RETRIEVE_PRINTERS,
    ACT_SELECT_PRINTER,
    ACT_UPDATE_PRINTER, ACT_UPDATE_PRINTER_LINE_CHARACTERS, ACT_UPDATE_PRINTER_MAIN,
    ACT_UPDATE_PRINTER_NAME
} from "../../actions/ActionTypes";
import printersStore from "../../stores/PrintersStore";

const EVT_PRINTERS_PAGE_STORE_CHANGED = "EVT_PRINTERS_PAGE_STORE_CHANGED";

class PrintersPageStore extends AbstractStore{

    constructor(){
        super(EVT_PRINTERS_PAGE_STORE_CHANGED);
        this.selectedPrinter = null;
        this.createdPrinter = null;
    }

    setName(value){
        this.createdPrinter.name = value;
    }

    setMain(value){
        this.createdPrinter.main = value;
    }

    setLineCharacters(value){
        this.createdPrinter.lineCharacters = value;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([printersStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_PRINTER_SERVICES:
            case ACT_RETRIEVE_PRINTERS:
                break;
            case ACT_CREATE_PRINTER:
                this.selectedPrinter = action.body.uuid;
                this.createdPrinter = null;
                break;
            case ACT_UPDATE_PRINTER:
                this.selectedPrinter = action.body.uuid;
                break;
            case ACT_DELETE_PRINTER:
                this.selectedPrinter = null;
                break;
            case ACT_BEGIN_CREATE_PRINTER:
                this.selectedPrinter = null;
                this.createdPrinter = this.buildPrinter();
                break;
            case ACT_SELECT_PRINTER:
                this.selectedPrinter = action.body;
                this.createdPrinter = null;
                break;
            case ACT_DESELECT_PRINTER:
                this.selectedPrinter = null;
                this.createdPrinter = null;
                break;
            case ACT_UPDATE_PRINTER_NAME:
                this.setName(action.body);
                break;
            case ACT_UPDATE_PRINTER_MAIN:
                this.setMain(action.body);
                break;
            case ACT_UPDATE_PRINTER_LINE_CHARACTERS:
                this.setLineCharacters(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildPrinter(){
        return {
            name: ""
        };
    }

    getState(){
        return {
            printers: printersStore.getPrinters(),
            services: printersStore.getServices(),

            selectedPrinter: this.selectedPrinter,
            createdPrinter: this.createdPrinter
        }
    }

}

const printersPageStore = new PrintersPageStore();
export default printersPageStore;