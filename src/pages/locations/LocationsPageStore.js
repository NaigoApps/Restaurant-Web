import AbstractStore from "../../stores/RootFeatureStore";
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
import printersStore from "../../stores/generic/PrintersStore";
import {LocationsCreatorActions, LocationsCreatorActionTypes} from "./LocationsCreatorActions";
import {EditorStatus} from "../StoresUtils";
import {findByUuid} from "../../utils/Utils";
import {LocationsEditorActions, LocationsEditorActionTypes} from "./LocationsEditorActions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {fromJS, Map} = require('immutable');

const EVT_LOCATIONS_PAGE_STORE_CHANGED = "EVT_LOCATIONS_PAGE_STORE_CHANGED";

class LocationsPageStore extends AbstractStore {

    constructor() {
        super(EVT_LOCATIONS_PAGE_STORE_CHANGED);
        this.location = null;
        this.editorStatus = EditorStatus.SURFING;
        this.page = 0;
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([locationsStore.getToken(), printersStore.getToken(), applicationStore.getToken()]);
        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_LOCATIONS:
                break;
            case LocationsCreatorActionTypes.CREATE_LOCATION:
                this.editorStatus = EditorStatus.EDITING;
                this.location = action.body.get('uuid');
                break;
                //FIXME Anche no...
            case LocationsEditorActionTypes.UPDATE_EDITING_LOCATION:
                this.editorStatus = EditorStatus.EDITING;
                this.location = action.body.get('uuid');
                break;
            case LocationsCreatorActionTypes.BEGIN_LOCATION_CREATION:
                this.editorStatus = EditorStatus.CREATING;
                this.location = EntitiesUtils.newLocation();
                break;
            case LocationsEditorActionTypes.SELECT_EDITING_LOCATION:
                this.editorStatus = EditorStatus.EDITING;
                this.location = action.body;
                break;
            case LocationsEditorActionTypes.SELECT_LOCATIONS_EDITOR_PAGE:
                this.page = action.body;
                break;
            case LocationsEditorActionTypes.DELETE_EDITING_LOCATION:
            case LocationsEditorActionTypes.DESELECT_EDITING_LOCATION:
            case LocationsCreatorActionTypes.ABORT_LOCATION_CREATION:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.editorStatus = EditorStatus.SURFING;
                this.location = null;
                break;
            case LocationsCreatorActionTypes.SET_CREATING_LOCATION_NAME:
                this.location = this.location.set('name', action.body);
                break;
            case LocationsCreatorActionTypes.SET_CREATING_LOCATION_PRINTER:
                this.location = this.location.set('printer', action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        let result = Map({
            locations: locationsStore.getLocations().getPayload(),
            printers: printersStore.getPrinters().getPayload(),

            page: this.page,
            editorStatus: this.editorStatus,
            location: this.getSelectedLocation(),

            settings: applicationStore.getSettings()
        });
        return {
            data : result
        }
    }

    getSelectedLocation() {
        if (this.editorStatus === EditorStatus.EDITING) {
            return findByUuid(locationsStore.getLocations().getPayload(), this.location);
        } else if (this.editorStatus === EditorStatus.CREATING) {
            return this.location;
        }
        return null;
    }
}

const locationsPageStore = new LocationsPageStore();
export default locationsPageStore;