import requestBuilder from "../../actions/RequestBuilder";
import dispatcher from "../../dispatcher/SimpleDispatcher";

export const CategoriesCreatorActionTypes = {
    BEGIN_CATEGORY_CREATION: "BEGIN_CATEGORY_CREATION",
    SET_CREATING_CATEGORY_NAME: "SET_CREATING_CATEGORY_NAME",
    SET_CREATING_CATEGORY_LOCATION: "SET_CREATING_CATEGORY_LOCATION",
    CREATE_CATEGORY: "CREATE_CATEGORY",
    ABORT_CATEGORY_CREATION: "ABORT_CATEGORY_CREATION",
};

export const CategoriesCreatorActions = {

    beginCreation: () =>
        dispatcher.fireEnd(
            CategoriesCreatorActionTypes.BEGIN_CATEGORY_CREATION
        ),

    confirmName: (uuid, name) =>
        dispatcher.fireEnd(
            CategoriesCreatorActionTypes.SET_CREATING_CATEGORY_NAME,
            name
        ),

    confirmLocation: (uuid, value) =>
        dispatcher.fireEnd(
            CategoriesCreatorActionTypes.SET_CREATING_CATEGORY_LOCATION,
            value
        ),

    onConfirm: (category) =>
        requestBuilder.post(
            CategoriesCreatorActionTypes.CREATE_CATEGORY,
            'categories',
            category),

    onAbort: () =>
        dispatcher.fireEnd(
            CategoriesCreatorActionTypes.ABORT_CATEGORY_CREATION
        ),

};