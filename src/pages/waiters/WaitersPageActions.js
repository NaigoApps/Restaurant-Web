import {DataActions} from "../../actions/DataActions";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {SettingsPageActions} from "../settings/SettingsPageActions";

export class WaitersPageActions {
    static BEGIN_WAITER_CREATION = "BEGIN_WAITER_CREATION";
    static SET_WAITER_EDITOR_NAME = "SET_WAITER_EDITOR_NAME";
    static SET_WAITER_EDITOR_SURNAME = "SET_WAITER_EDITOR_SURNAME";
    static SET_WAITER_EDITOR_CF = "SET_WAITER_EDITOR_CF";
    static SET_WAITER_EDITOR_STATUS = "SET_WAITER_EDITOR_STATUS";
    static CREATE_WAITER = "CREATE_WAITER";

    static SELECT_EDITING_WAITER = "SELECT_EDITING_WAITER";
    static SELECT_WAITER_NAVIGATOR_PAGE = "SELECT_WAITER_NAVIGATOR_PAGE";
    static UPDATE_EDITING_WAITER = "UPDATE_EDITING_WAITER";
    static DELETE_EDITING_WAITER = "DELETE_EDITING_WAITER";

    static initWaitersPage() {
        DataActions.loadWaiters();
        DataActions.loadWaiterStatuses();
        SettingsPageActions.loadSettings();
    }


    static beginWaiterCreation() {
        dispatcher.fireEnd(this.BEGIN_WAITER_CREATION);
    }

    static setEditorName(name) {
        dispatcher.fireEnd(this.SET_WAITER_EDITOR_NAME, name);
    }

    static setEditorSurname(surname) {
        dispatcher.fireEnd(this.SET_WAITER_EDITOR_SURNAME, surname);
    }

    static setEditorCf(cf) {
        dispatcher.fireEnd(this.SET_WAITER_EDITOR_CF, cf);
    }

    static setEditorStatus(status) {
        dispatcher.fireEnd(this.SET_WAITER_EDITOR_STATUS, status);
    }

    static createWaiter(waiter) {
        asyncActionBuilder.post(this.CREATE_WAITER, 'waiters', waiter.toDto());
    }


    static selectWaiter(waiter) {
        dispatcher.fireEnd(this.SELECT_EDITING_WAITER, waiter);
    }

    static selectNavigatorPage(page) {
        dispatcher.fireEnd(this.SELECT_WAITER_NAVIGATOR_PAGE, page);
    }

    static updateWaiterName(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_WAITER, 'waiters/' + uuid + '/name', value);
    }

    static updateWaiterSurname(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_WAITER, 'waiters/' + uuid + '/surname', value);
    }

    static updateWaiterCf(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_WAITER, 'waiters/' + uuid + '/cf', value);
    }

    static updateWaiterStatus(uuid, value) {
        asyncActionBuilder.put(this.UPDATE_EDITING_WAITER, 'waiters/' + uuid + '/status', value);
    }

    static deleteWaiter(waiter) {
        asyncActionBuilder.remove(this.DELETE_EDITING_WAITER, 'waiters', waiter.uuid);
    }

    registerSocket() {
        let socket = new WebSocket('ws://localhost:8080/restaurant/notifications')
        socket.onopen = function (event) {
            console.info("Connection opened");
        };
        socket.onmessage = function (event) {
            console.info("Message: " + event.data);
        };
        socket.onclose = function () {
            console.info("Connection closed");
        }
    }
}