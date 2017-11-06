import locationsActions from "../../generic/LocationsActions";
import printersActions from "../../generic/PrintersActions";

class LocationsPageActions {

    initLocationsPage(){
        printersActions.retrievePrinters();
        locationsActions.retrieveLocations();
    }

}

const locationsPageActions = new LocationsPageActions();
export default locationsPageActions;