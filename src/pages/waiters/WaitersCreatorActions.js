import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const WaitersCreatorActionTypes = {
    BEGIN_WAITER_CREATION: "BEGIN_WAITER_CREATION",
    SET_CREATING_WAITER_NAME: "SET_CREATING_WAITER_NAME",
    SET_CREATING_WAITER_SURNAME: "SET_CREATING_WAITER_SURNAME",
    SET_CREATING_WAITER_CF: "SET_CREATING_WAITER_CF",
    SET_CREATING_WAITER_STATUS: "SET_CREATING_WAITER_STATUS",
    CREATE_WAITER: "CREATE_WAITER",
    ABORT_WAITER_CREATION: "ABORT_WAITER_CREATION",
};

export const WaitersCreatorActions = {

    beginWaiterCreation: () =>
        dispatcher.fireEnd(
            WaitersCreatorActionTypes.BEGIN_WAITER_CREATION
        ),

    confirmName: (uuid, name) =>
        dispatcher.fireEnd(
            WaitersCreatorActionTypes.SET_CREATING_WAITER_NAME,
            name
        ),

    confirmSurname: (uuid, surname) =>
        dispatcher.fireEnd(
            WaitersCreatorActionTypes.SET_CREATING_WAITER_SURNAME,
            surname
        ),

    confirmCf: (uuid, cf) =>
        dispatcher.fireEnd(
            WaitersCreatorActionTypes.SET_CREATING_WAITER_CF,
            cf
        ),

    confirmStatus: (uuid, status) =>
        dispatcher.fireEnd(
            WaitersCreatorActionTypes.SET_CREATING_WAITER_STATUS,
            status
        ),

    onConfirm: (waiter) =>
        asyncActionBuilder.post(
            WaitersCreatorActionTypes.CREATE_WAITER,
            'waiters',
            waiter
        ),

    onAbort: () =>
        dispatcher.fireEnd(
            WaitersCreatorActionTypes.ABORT_WAITER_CREATION
        ),

};