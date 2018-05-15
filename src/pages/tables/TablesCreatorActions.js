import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const TablesCreatorActionTypes = {
    SET_CREATING_R_TABLE_NAME: "SET_CREATING_R_TABLE_NAME",
    BEGIN_R_TABLE_CREATION: "BEGIN_R_TABLE_CREATION",
    CREATE_R_TABLE: "CREATE_R_TABLE",
    ABORT_R_TABLE_CREATION: "ABORT_R_TABLE_CREATION",
};

export const TablesCreatorActions = {

    confirmName: (uuid, name) =>
        dispatcher.fireEnd(
            TablesCreatorActionTypes.SET_CREATING_R_TABLE_NAME,
            name
        ),

    beginTableCreation: () =>
        dispatcher.fireEnd(
            TablesCreatorActionTypes.BEGIN_R_TABLE_CREATION,
        ),

    onConfirm: (table) =>
        asyncActionBuilder.post(
            TablesCreatorActionTypes.CREATE_R_TABLE,
            'restaurant-tables',
            table),

    onAbort: () =>
        dispatcher.fireEnd(
            TablesCreatorActionTypes.ABORT_R_TABLE_CREATION,
        ),
};