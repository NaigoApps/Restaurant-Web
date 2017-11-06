import asyncActionBuilder from "../actions/RequestBuilder";
import {ACT_RETRIEVE_LOCATIONS} from "../actions/ActionTypes";

class LocationsActions {

    retrieveLocations() {
        asyncActionBuilder.get(ACT_RETRIEVE_LOCATIONS, 'locations');
    }

}

const locationsActions = new LocationsActions();
export default locationsActions;