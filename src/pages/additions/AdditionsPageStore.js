import AbstractStore from "../../stores/RootFeatureStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {ACT_RETRIEVE_ADDITIONS} from "../../actions/ActionTypes";
import additionsStore from "../../stores/generic/AdditionsStore";
import {EditorStatus} from "../StoresUtils";
import {AdditionsCreatorActionTypes} from "./AdditionsCreatorActions";
import {AdditionsEditorActionTypes} from "./AdditionsEditorActions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {findByUuid} from "../../utils/Utils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {Map} = require('immutable');

const EVT_ADDITIONS_PAGE_STORE_CHANGED = "EVT_ADDITIONS_PAGE_STORE_CHANGED";

class AdditionsPageStore extends AbstractStore {

    constructor() {
        super(EVT_ADDITIONS_PAGE_STORE_CHANGED);
        this.addition = null;
        this.editorStatus = EditorStatus.SURFING;
        this.page = 0;
    }

    handleCompletedAction(action) {
        let changed = true;
        dispatcher.waitFor([additionsStore.getToken(), applicationStore.getToken()]);
        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_ADDITIONS:
                break;
            case AdditionsCreatorActionTypes.CREATE_ADDITION:
            case AdditionsEditorActionTypes.UPDATE_EDITING_ADDITION:
                this.addition = action.body.get('uuid');
                this.editorStatus = EditorStatus.EDITING;
                break;
            case AdditionsCreatorActionTypes.ABORT_ADDITION_CREATION:
            case AdditionsEditorActionTypes.DELETE_EDITING_ADDITION:
            case AdditionsEditorActionTypes.DESELECT_EDITING_ADDITION:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.addition = null;
                this.editorStatus = EditorStatus.SURFING;
                break;
            case AdditionsCreatorActionTypes.BEGIN_ADDITION_CREATION:
                this.addition = EntitiesUtils.newAddition();
                this.editorStatus = EditorStatus.CREATING;
                break;
            case AdditionsEditorActionTypes.SELECT_EDITING_ADDITION:
                this.addition = action.body;
                this.editorStatus = EditorStatus.EDITING;
                break;
            case AdditionsEditorActionTypes.SELECT_EDITING_ADDITION_PAGE:
                this.page = action.body;
                break;
            case AdditionsCreatorActionTypes.SET_CREATING_ADDITION_NAME:
                this.addition = this.addition.set('name', action.body);
                break;
            case AdditionsCreatorActionTypes.SET_CREATING_ADDITION_GENERIC:
                this.addition = this.addition.set('generic', action.body);
                break;
            case AdditionsCreatorActionTypes.SET_CREATING_ADDITION_PRICE:
                this.addition = this.addition.set('price', action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState() {
        let value = Map({
            additions: additionsStore.getAdditions().getPayload(),

            addition: this.getSelectedAddition(),
            page: this.page,
            editorStatus: this.editorStatus,

            settings: applicationStore.getSettings()
        });

        return {
            data: value
        };
    }

    getSelectedAddition() {
        if (this.editorStatus === EditorStatus.EDITING) {
            return findByUuid(additionsStore.getAdditions().getPayload(), this.addition);
        } else if (this.editorStatus === EditorStatus.CREATING) {
            return this.addition;
        }
        return null;
    }

}

const additionsPageStore = new AdditionsPageStore();
export default additionsPageStore;