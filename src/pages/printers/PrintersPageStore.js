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
import AbstractEntityStore from "../../stores/generic/AbstractEntityStore";

const {fromJS, Map} = require('immutable');

const EVT_PRINTERS_PAGE_STORE_CHANGED = "EVT_PRINTERS_PAGE_STORE_CHANGED";

class PrintersPageStore extends AbstractStore{

    constructor(){
        super(EVT_PRINTERS_PAGE_STORE_CHANGED);
        this.selectedPrinter = null;
        this.createdPrinter = null;
    }

    setName(value){
        this.createdPrinter = this.createdPrinter.set('name', value);
    }

    setMain(value){
        this.createdPrinter = this.createdPrinter.set('main', value);
    }

    setLineCharacters(value){
        this.createdPrinter = this.createdPrinter.set('lineCharacters', value);
    }

    handleCompletedAction(action){
        dispatcher.waitFor([printersStore.getToken()]);

        let changed = AbstractEntityStore.areLoaded([printersStore]);

        switch (action.type) {
            case ACT_RETRIEVE_PRINTER_SERVICES:
            case ACT_RETRIEVE_PRINTERS:
                break;
            case ACT_CREATE_PRINTER:
                this.selectedPrinter = action.body.get('uuid');
                this.createdPrinter = null;
                break;
            case ACT_UPDATE_PRINTER:
                this.selectedPrinter = action.body.get('uuid');
                break;
            case ACT_DELETE_PRINTER:
                this.selectedPrinter = null;
                break;
            case ACT_BEGIN_CREATE_PRINTER:
                this.selectedPrinter = null;
                this.createdPrinter = this.buildPrinter();
                break;
            case ACT_SELECT_PRINTER:
                this.selectedPrinter = action.body.get('uuid');
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
        return Map({
            name: "",
            main: false,
            lineCharacters: 0
        });
    }

    getState(){
        let result = Map({
            printers: printersStore.getPrinters().getPayload(),
            services: printersStore.getServices(),

            selectedPrinter: this.selectedPrinter,
            createdPrinter: this.createdPrinter
        });
        return {
            data: result
        }
    }

}

const printersPageStore = new PrintersPageStore();
export default printersPageStore;