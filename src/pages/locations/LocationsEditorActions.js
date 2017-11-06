import {
    ACT_DELETE_LOCATION,
    ACT_DESELECT_LOCATION,
    ACT_SELECT_LOCATION,
    ACT_UPDATE_LOCATION
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

class LocationsEditorActions {

    selectLocation(location) {
        dispatcher.fireEnd(ACT_SELECT_LOCATION, location);
    }

    deselectLocation(){
        dispatcher.fireEnd(ACT_DESELECT_LOCATION);
    }

    updateLocationName(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_LOCATION,
            'locations/' + uuid + '/name',
            value
        );
    }

    updateLocationPrinter(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_LOCATION,
            'locations/' + uuid + '/printer',
            value
        );
    }

    deleteLocation(uuid) {
        asyncActionBuilder.remove(ACT_DELETE_LOCATION, 'locations', uuid);
    }

}

const locationsEditorActions = new LocationsEditorActions();
export default locationsEditorActions;