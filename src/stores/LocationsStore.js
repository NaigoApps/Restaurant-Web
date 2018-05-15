import {
    ACT_CREATE_LOCATION,
    ACT_DELETE_LOCATION,
    ACT_RETRIEVE_LOCATIONS,
    ACT_UPDATE_LOCATION
} from "../actions/ActionTypes";
import {STATUSES} from "./LazyData";
import AbstractEntityStore from "./generic/AbstractEntityStore";
import {LocationsCreatorActions, LocationsCreatorActionTypes} from "../pages/locations/LocationsCreatorActions";
import {LocationsEditorActionTypes} from "../pages/locations/LocationsEditorActions";

const EVT_LOCATIONS_STORE_CHANGED = "EVT_LOCATIONS_STORE_CHANGED";

class LocationsStore extends AbstractEntityStore {
    constructor() {
        super(EVT_LOCATIONS_STORE_CHANGED);
    }


    getLocations() {
        return this.getData();
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_LOCATIONS:
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
            case LocationsCreatorActionTypes.CREATE_LOCATION:
                this.createData(action.body);
                break;
            case ACT_RETRIEVE_LOCATIONS:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case LocationsEditorActionTypes.UPDATE_EDITING_LOCATION:
                this.updateData(action.body);
                break;
            case LocationsEditorActionTypes.DELETE_EDITING_LOCATION:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const locationsStore = new LocationsStore();
export default locationsStore;