import AbstractStore from "../../stores/AbstractStore";
import EditorMode from "../../utils/EditorMode";
import {Utils} from "../../utils/Utils";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import dataStore, {Topics} from "../../stores/DataStore";
import {WaitersPageActions} from "./WaitersPageActions";
import Waiter from "../../model/Waiter";

const EVT_WAITERS_PAGE_STORE_CHANGED = "EVT_WAITERS_PAGE_STORE_CHANGED";

class WaitersPageStore extends AbstractStore {

    constructor() {
        super("waiters", EVT_WAITERS_PAGE_STORE_CHANGED, applicationStore, dataStore);
        this.initEditor();
        this.navigator = {
            page: 0
        };
    }

    initEditor(waiter, creating) {
        this.editor = {
            mode: null,
            waiter: null
        };
        if (waiter) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.waiter = waiter;
        }
    }

    getActionsClass(){
        return WaitersPageActions;
    }

    getActionCompletedHandlers() {
        const handlers = {};
        handlers[WaitersPageActions.BEGIN_WAITER_CREATION] = () =>
            this.initEditor(Waiter.create(EntitiesUtils.newWaiter(), dataStore.getPool()), true);
        handlers[WaitersPageActions.SET_WAITER_EDITOR_NAME] = (value) => this.editor.waiter.name = value;
        handlers[WaitersPageActions.SET_WAITER_EDITOR_SURNAME] = (value) => this.editor.waiter.surname = value;
        handlers[WaitersPageActions.SET_WAITER_EDITOR_CF] = (value) => this.editor.waiter.cf = value;
        handlers[WaitersPageActions.SET_WAITER_EDITOR_STATUS] = (value) => this.editor.waiter.status = value;
        handlers[WaitersPageActions.CREATE_WAITER] = (waiter) =>
            this.initEditor(dataStore.getEntity(waiter.uuid));
        handlers[WaitersPageActions.UPDATE_EDITING_WAITER] = (waiter) =>
            this.initEditor(dataStore.getEntity(waiter.uuid));
        handlers[WaitersPageActions.SELECT_EDITING_WAITER] = (waiter) => this.initEditor(waiter);
        handlers[WaitersPageActions.SELECT_WAITER_NAVIGATOR_PAGE] = (page) => this.navigator.page = page;
        handlers[WaitersPageActions.DELETE_EDITING_WAITER] = () => this.initEditor();

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[WaitersPageActions.LOAD_WAITERS] = () => Utils.nop();
        handlers[WaitersPageActions.LOAD_WAITER_STATUSES] = () => Utils.nop();
        return handlers;
    }

    buildState() {
        return {
            editor: this.editor,
            navigator: this.navigator
        };
    }

}

const waitersPageStore = new WaitersPageStore();
export default waitersPageStore;