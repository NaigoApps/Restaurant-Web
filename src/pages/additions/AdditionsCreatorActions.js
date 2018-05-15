import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const AdditionsCreatorActionTypes = {
    BEGIN_ADDITION_CREATION: "BEGIN_ADDITION_CREATION",
    CREATE_ADDITION: "CREATE_ADDITION",
    ABORT_ADDITION_CREATION: "ABORT_ADDITION_CREATION",
    SET_CREATING_ADDITION_NAME: "SET_CREATING_ADDITION_NAME",
    SET_CREATING_ADDITION_PRICE: "SET_CREATING_ADDITION_PRICE",
    SET_CREATING_ADDITION_GENERIC: "SET_CREATING_ADDITION_GENERIC",
};

export const AdditionsCreatorActions = {

    beginAdditionCreation: () =>
        dispatcher.fireEnd(
            AdditionsCreatorActionTypes.BEGIN_ADDITION_CREATION
        ),

    onConfirm: (addition) =>
        asyncActionBuilder.post(
            AdditionsCreatorActionTypes.CREATE_ADDITION,
            "additions",
            addition
        ),

    onAbort: () =>
        dispatcher.fireEnd(
            AdditionsCreatorActionTypes.ABORT_ADDITION_CREATION
        ),

    confirmName: (uuid, name) =>
        dispatcher.fireEnd(
            AdditionsCreatorActionTypes.SET_CREATING_ADDITION_NAME,
            name
        ),

    confirmPrice: (uuid, price) =>
        dispatcher.fireEnd(
            AdditionsCreatorActionTypes.SET_CREATING_ADDITION_PRICE,
            price
        ),

    confirmGeneric: (uuid, generic) =>
        dispatcher.fireEnd(
            AdditionsCreatorActionTypes.SET_CREATING_ADDITION_GENERIC,
            generic
        ),
};