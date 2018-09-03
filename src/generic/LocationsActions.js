import asyncActionBuilder from "../actions/RequestBuilder";
import {DataActionTypes} from "../actions/DataActions";

class LocationsActions {

    retrieveLocations() {
        asyncActionBuilder.get(DataActionTypes.LOAD_LOCATIONS, 'locations');
    }

}

const locationsActions = new LocationsActions();
export default locationsActions;