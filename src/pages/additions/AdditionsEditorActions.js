import asyncActionBuilder from "../../actions/RequestBuilder";
import dispatcher from "../../dispatcher/SimpleDispatcher";

export const AdditionsEditorActionTypes = {
    DELETE_EDITING_ADDITION: "DELETE_EDITING_ADDITION",
    UPDATE_EDITING_ADDITION: "UPDATE_EDITING_ADDITION",
    SELECT_EDITING_ADDITION: "SELECT_EDITING_ADDITION",
    SELECT_EDITING_ADDITION_PAGE: "SELECT_EDITING_ADDITION_PAGE",
    DESELECT_EDITING_ADDITION: "DESELECT_EDITING_ADDITION",
};

export const AdditionsEditorActions = {

    onDelete: (addition) =>
        asyncActionBuilder.remove(
            AdditionsEditorActionTypes.DELETE_EDITING_ADDITION,
            "additions",
            addition
        ),

    confirmName: (uuid, name) =>
        asyncActionBuilder.put(
            AdditionsEditorActionTypes.UPDATE_EDITING_ADDITION,
            "additions/" + uuid + "/name",
            name
        ),

    confirmPrice: (uuid, price) =>
        asyncActionBuilder.put(
            AdditionsEditorActionTypes.UPDATE_EDITING_ADDITION,
            "additions/" + uuid + "/price",
            price
        ),

    confirmGeneric: (uuid, generic) =>
        asyncActionBuilder.put(
            AdditionsEditorActionTypes.UPDATE_EDITING_ADDITION,
            "additions/" + uuid + "/generic",
            generic.toString()
        ),

    selectAddition: (addition) =>
        dispatcher.fireEnd(
            AdditionsEditorActionTypes.SELECT_EDITING_ADDITION,
            addition
        ),

    selectAdditionsPage: (page) =>
        dispatcher.fireEnd(
            AdditionsEditorActionTypes.SELECT_EDITING_ADDITION_PAGE,
            page
        ),

    deselectAddition: () =>
        dispatcher.fireEnd(
            AdditionsEditorActionTypes.DESELECT_EDITING_ADDITION
        )
}