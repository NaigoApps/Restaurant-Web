import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const LocationsEditorActionTypes = {
    SELECT_EDITING_LOCATION: "SELECT_EDITING_LOCATION",
    DESELECT_EDITING_LOCATION: "DESELECT_EDITING_LOCATION",
    UPDATE_EDITING_LOCATION: "UPDATE_EDITING_LOCATION",
    DELETE_EDITING_LOCATION: "DELETE_EDITING_LOCATION",
    SELECT_LOCATIONS_EDITOR_PAGE: "SELECT_LOCATIONS_EDITOR_PAGE"
};

export const LocationsEditorActions = {

    selectLocationsPage: (page) =>
        dispatcher.fireEnd(
            LocationsEditorActionTypes.SELECT_LOCATIONS_EDITOR_PAGE,
            page
        ),

    selectLocation: (location) =>
        dispatcher.fireEnd(
            LocationsEditorActionTypes.SELECT_EDITING_LOCATION,
            location
        ),

    deselectLocation: () =>
        dispatcher.fireEnd(
            LocationsEditorActionTypes.DESELECT_EDITING_LOCATION
        ),

    confirmName: (uuid, value) =>
        asyncActionBuilder.put(
            LocationsEditorActionTypes.UPDATE_EDITING_LOCATION,
            'locations/' + uuid + '/name',
            value
        ),

    confirmPrinter: (uuid, value) =>
        asyncActionBuilder.put(
            LocationsEditorActionTypes.UPDATE_EDITING_LOCATION,
            'locations/' + uuid + '/printer',
            value
        ),

    deleteLocation: (uuid) =>
        asyncActionBuilder.remove(
            LocationsEditorActionTypes.DELETE_EDITING_LOCATION,
            'locations',
            uuid
        )

};