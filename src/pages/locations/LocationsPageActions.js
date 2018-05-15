import locationsActions from "../../generic/LocationsActions";
import printersActions from "../../generic/PrintersActions";
import {ApplicationActions} from "../../actions/ApplicationActions";

class LocationsPageActions {

    initLocationsPage(){
        printersActions.retrievePrinters();
        locationsActions.retrieveLocations();
        ApplicationActions.loadSettings();
    }

}

const locationsPageActions = new LocationsPageActions();
export default locationsPageActions;