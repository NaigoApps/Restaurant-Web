import EditorMode from "../../utils/EditorMode";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {Utils} from "../../utils/Utils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";
import {DataActionTypes} from "../../actions/DataActions";
import AbstractStore from "../../stores/AbstractStore";
import dataStore from "../../stores/DataStore";
import Addition from "../../model/Addition";
import AdditionsPageActions from "../additions/AdditionsPageActions";

const EVT_ADDITIONS_PAGE_STORE_CHANGED = "EVT_ADDITIONS_PAGE_STORE_CHANGED";

class AdditionsPageStore extends AbstractStore {

    constructor() {
        super("additions", EVT_ADDITIONS_PAGE_STORE_CHANGED, applicationStore, dataStore);
        this.initEditor();
        this.navigator = {
            page: 0
        }
    }

    getActionsClass() {
        return AdditionsPageActions;
    }

    initEditor(addition, creating) {
        this.editor = {
            mode: null,
            addition: null
        };
        if (addition) {
            this.editor.mode = creating ? EditorMode.CREATING : EditorMode.EDITING;
            this.editor.addition = addition;
        }
    }

    getActionCompletedHandlers() {
        const handlers = {};


        handlers[AdditionsPageActions.BEGIN_ADDITION_CREATION] = () =>
            this.initEditor(Addition.create(EntitiesUtils.newAddition(), dataStore.getPool()), true);
        handlers[AdditionsPageActions.SET_ADDITION_EDITOR_NAME] = (value) => this.editor.addition.name = value;
        handlers[AdditionsPageActions.SET_ADDITION_EDITOR_GENERIC] = (value) => this.editor.addition.generic = value;
        handlers[AdditionsPageActions.SET_ADDITION_EDITOR_PRICE] = (value) => this.editor.addition.price = value;
        handlers[AdditionsPageActions.CREATE_ADDITION] = (add) =>
            this.initEditor(dataStore.getEntity(add.uuid));
        handlers[AdditionsPageActions.SELECT_EDITING_ADDITION] = (add) => this.initEditor(add);
        handlers[AdditionsPageActions.UPDATE_EDITING_ADDITION] = (add) =>
            this.initEditor(dataStore.getEntity(add.uuid));
        handlers[AdditionsPageActions.DELETE_EDITING_ADDITION] = () =>
            this.initEditor();
        handlers[AdditionsPageActions.SELECT_EDITING_ADDITION_PAGE] = (page) => this.navigator.page = page;

        handlers[ApplicationActionTypes.LOAD_SETTINGS] = () => Utils.nop();
        handlers[DataActionTypes.LOAD_ADDITIONS] = () => Utils.nop();
        return handlers;
    }

    buildState() {
        return {
            editor: this.editor,
            navigator: this.navigator,
        };
    }

}

const additionsPageStore = new AdditionsPageStore();
export default additionsPageStore;