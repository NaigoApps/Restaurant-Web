import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const LocationsCreatorActionTypes = {
    BEGIN_LOCATION_CREATION: "BEGIN_LOCATION_CREATION",
    SET_CREATING_LOCATION_NAME: "SET_CREATING_LOCATION_NAME",
    SET_CREATING_LOCATION_PRINTER: "SET_CREATING_LOCATION_PRINTER",
    CREATE_LOCATION: "CREATE_LOCATION",
    ABORT_LOCATION_CREATION: "ABORT_LOCATION_CREATION",
};

export const LocationsCreatorActions = {

    beginLocationCreation: () =>
        dispatcher.fireEnd(
            LocationsCreatorActionTypes.BEGIN_LOCATION_CREATION
        ),

    confirmName: (uuid, name) =>
        dispatcher.fireEnd(
            LocationsCreatorActionTypes.SET_CREATING_LOCATION_NAME,
            name
        ),

    confirmPrinter: (uuid, printer) =>
        dispatcher.fireEnd(
            LocationsCreatorActionTypes.SET_CREATING_LOCATION_PRINTER,
            printer
        ),

    onConfirm: (location) =>
        asyncActionBuilder.post(
            LocationsCreatorActionTypes.CREATE_LOCATION,
            'locations',
            location
        ),

    onAbort: () =>
        dispatcher.fireEnd(
            LocationsCreatorActionTypes.ABORT_LOCATION_CREATION
        ),
};