import dispatcher from "../../dispatcher/SimpleDispatcher";
import {ApplicationActions} from "../../actions/ApplicationActions";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

export class LocationsPageActionTypes {
    static SELECT_EDITING_LOCATION = "SELECT_EDITING_LOCATION";
    static SELECT_LOCATION_NAVIGATOR_PAGE = "SELECT_LOCATION_NAVIGATOR_PAGE";

    static UPDATE_EDITING_LOCATION = "UPDATE_EDITING_LOCATION";
    static DELETE_EDITING_LOCATION = "DELETE_EDITING_LOCATION";

    static BEGIN_LOCATION_CREATION = "BEGIN_LOCATION_CREATION";
    static SET_LOCATION_EDITOR_NAME = "SET_LOCATION_EDITOR_NAME";
    static SET_LOCATION_EDITOR_PRINTER = "SET_LOCATION_EDITOR_PRINTER";
    static CREATE_LOCATION = "CREATE_LOCATION";
}

export class LocationsPageActions {

    static initLocationsPage() {
        SettingsPageActions.loadSettings();
        DataActions.loadPrinters();
        DataActions.loadLocations();
    }

    static selectLocationNavigatorPage(index) {
        dispatcher.fireEnd(LocationsPageActionTypes.SELECT_LOCATION_NAVIGATOR_PAGE, index);
    }

    static beginLocationCreation() {
        dispatcher.fireEnd(
            LocationsPageActionTypes.BEGIN_LOCATION_CREATION
        );
    }

    static setEditorName(name) {
        dispatcher.fireEnd(
            LocationsPageActionTypes.SET_LOCATION_EDITOR_NAME,
            name
        );
    }

    static setEditorPrinter(lcs) {
        dispatcher.fireEnd(
            LocationsPageActionTypes.SET_LOCATION_EDITOR_PRINTER,
            lcs
        );
    }

    static createLocation(location) {
        asyncActionBuilder.post(
            LocationsPageActionTypes.CREATE_LOCATION,
            'locations',
            location.toDto()
        );
    }

    static selectLocation(location) {
        dispatcher.fireEnd(LocationsPageActionTypes.SELECT_EDITING_LOCATION, location);
    }

    static setLocationName(uuid, name) {
        asyncActionBuilder.put(
            LocationsPageActionTypes.UPDATE_EDITING_LOCATION,
            'locations/' + uuid + '/name',
            name
        );
    }

    static setLocationPrinter(uuid, printer) {
        asyncActionBuilder.put(
            LocationsPageActionTypes.UPDATE_EDITING_LOCATION,
            'locations/' + uuid + '/lineCharacters',
            printer.uuid
        );
    }

    static deleteLocation(location) {
        asyncActionBuilder.remove(
            LocationsPageActionTypes.DELETE_EDITING_LOCATION,
            'locations',
            location.uuid
        );
    }

}