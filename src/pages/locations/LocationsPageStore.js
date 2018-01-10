import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_LOCATION,
    ACT_CREATE_LOCATION,
    ACT_DELETE_LOCATION,
    ACT_DESELECT_LOCATION,
    ACT_RETRIEVE_LOCATIONS,
    ACT_SELECT_LOCATION,
    ACT_UPDATE_LOCATION,
    ACT_UPDATE_LOCATION_NAME,
    ACT_UPDATE_LOCATION_PRINTER
} from "../../actions/ActionTypes";
import locationsStore from "../../stores/LocationsStore";
import printersStore from "../../stores/PrintersStore";

const EVT_LOCATIONS_PAGE_STORE_CHANGED = "EVT_LOCATIONS_PAGE_STORE_CHANGED";

class LocationsPageStore extends AbstractStore{

    constructor(){
        super(EVT_LOCATIONS_PAGE_STORE_CHANGED);
        this.selectedLocation = null;
        this.createdLocation = null;
    }

    setName(value){
        this.createdLocation.name = value;
    }

    setPrinter(value){
        this.createdLocation.printer = value;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([locationsStore.getToken(), printersStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_LOCATIONS:
                break;
            case ACT_CREATE_LOCATION:
                this.selectedLocation = action.body.uuid;
                this.createdLocation = null;
                break;
            case ACT_UPDATE_LOCATION:
                this.selectedLocation = action.body.uuid;
                break;
            case ACT_DELETE_LOCATION:
                this.selectedLocation = null;
                break;
            case ACT_BEGIN_CREATE_LOCATION:
                this.selectedLocation = null;
                this.createdLocation = this.buildLocation();
                break;
            case ACT_SELECT_LOCATION:
                this.selectedLocation = action.body;
                this.createdLocation = null;
                break;
            case ACT_DESELECT_LOCATION:
                this.selectedLocation = null;
                this.createdLocation = null;
                break;
            case ACT_UPDATE_LOCATION_NAME:
                this.setName(action.body);
                break;
            case ACT_UPDATE_LOCATION_PRINTER:
                this.setPrinter(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildLocation(){
        return {
            name: "",
            printer: ""
        };
    }

    getState(){
        return {
            locations: locationsStore.getLocations().getPayload(),
            printers: printersStore.getPrinters().getPayload(),

            selectedLocation: this.selectedLocation,
            createdLocation: this.createdLocation
        }
    }

}

const locationsPageStore = new LocationsPageStore();
export default locationsPageStore;