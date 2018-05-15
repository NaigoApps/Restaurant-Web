import {ACT_DELETE_RESTAURANT_TABLE} from "../../actions/ActionTypes"
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const TablesEditorActionTypes = {
    SELECT_R_TABLE_PAGE: "SELECT_R_TABLE_PAGE",
    SELECT_EDITING_R_TABLE: "SELECT_EDITING_R_TABLE",
    DESELECT_EDITING_R_TABLE: "DESELECT_EDITING_R_TABLE",
    UPDATE_R_TABLE: "UPDATE_R_TABLE",
    DELETE_EDITING_R_TABLE: "DELETE_EDITING_R_TABLE",
};

export const TablesEditorActions = {

    selectTable: (table) =>
        dispatcher.fireEnd(
            TablesEditorActionTypes.SELECT_EDITING_R_TABLE,
            table
        ),

    selectTablePage: page =>
        dispatcher.fireEnd(
            TablesEditorActionTypes.SELECT_R_TABLE_PAGE,
            page
        ),

    deselectTable: () =>
        dispatcher.fireEnd(
            TablesEditorActionTypes.DESELECT_EDITING_R_TABLE
        ),

    confirmName: (uuid, value) =>
        asyncActionBuilder.put(
            TablesEditorActionTypes.UPDATE_R_TABLE,
            'restaurant-tables/' + uuid + '/name',
            value
        ),

    onDelete: (uuid) =>
        asyncActionBuilder.remove(
            TablesEditorActionTypes.DELETE_EDITING_R_TABLE,
            'restaurant-tables',
            uuid
        )

};