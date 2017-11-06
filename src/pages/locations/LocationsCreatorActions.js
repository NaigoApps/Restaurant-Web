import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {
    ACT_BEGIN_CREATE_LOCATION,
    ACT_CREATE_LOCATION,
    ACT_UPDATE_LOCATION_NAME,
    ACT_UPDATE_LOCATION_PRINTER
} from "../../actions/ActionTypes";

class LocationsCreatorActions {

    beginLocationCreation() {
        dispatcher.fireEnd(ACT_BEGIN_CREATE_LOCATION);
    }

    updateLocationName(uuid, name) {
        dispatcher.fireEnd(ACT_UPDATE_LOCATION_NAME, name);
    }

    updateLocationPrinter(uuid, printer) {
        dispatcher.fireEnd(ACT_UPDATE_LOCATION_PRINTER, printer);
    }

    createLocation(location) {
        asyncActionBuilder.post(ACT_CREATE_LOCATION, 'locations', location);
    }

}

const locationsCreatorActions = new LocationsCreatorActions();
export default locationsCreatorActions;