import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const WaitersEditorActionTypes = {
    SELECT_EDITING_WAITER: "SELECT_EDITING_WAITER",
    SELECT_EDITING_WAITER_PAGE: "SELECT_EDITING_WAITER_PAGE",
    DESELECT_EDITING_WAITER: "DESELECT_EDITING_WAITER",
    UPDATE_EDITING_WAITER: "UPDATE_EDITING_WAITER",
    DELETE_EDITING_WAITER: "DELETE_EDITING_WAITER",
};

export const WaitersEditorActions = {

    selectWaiter: (waiter) =>
        dispatcher.fireEnd(
            WaitersEditorActionTypes.SELECT_EDITING_WAITER,
            waiter
        ),

    selectWaiterPage: (page) =>
        dispatcher.fireEnd(
            WaitersEditorActionTypes.SELECT_EDITING_WAITER_PAGE,
            page
        ),

    deselectWaiter: () =>
        dispatcher.fireEnd(
            WaitersEditorActionTypes.DESELECT_EDITING_WAITER
        ),

    confirmName: (uuid, value) =>
        asyncActionBuilder.put(
            WaitersEditorActionTypes.UPDATE_EDITING_WAITER,
            'waiters/' + uuid + '/name',
            value
        ),

    confirmSurname: (uuid, value) =>
        asyncActionBuilder.put(
            WaitersEditorActionTypes.UPDATE_EDITING_WAITER,
            'waiters/' + uuid + '/surname',
            value
        ),

    confirmCf: (uuid, value) =>
        asyncActionBuilder.put(
            WaitersEditorActionTypes.UPDATE_EDITING_WAITER,
            'waiters/' + uuid + '/cf',
            value
        ),

    confirmStatus: (uuid, value) =>
        asyncActionBuilder.put(
            WaitersEditorActionTypes.UPDATE_EDITING_WAITER,
            'waiters/' + uuid + '/status',
            value
        ),

    onDelete: (uuid) =>
        asyncActionBuilder.remove(
            WaitersEditorActionTypes.DELETE_EDITING_WAITER,
            'waiters',
            uuid
        )
};