import AbstractStore from "../../stores/RootFeatureStore";
import waitersStore from "../../stores/generic/WaitersStore";
import waiterStatusesStore from "../../generic/WaiterStatusesStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_WAITER, ACT_CREATE_WAITER, ACT_DELETE_WAITER, ACT_DESELECT_WAITER, ACT_RETRIEVE_WAITERS,
    ACT_SELECT_WAITER,
    ACT_UPDATE_WAITER, ACT_UPDATE_WAITER_CF, ACT_UPDATE_WAITER_NAME, ACT_UPDATE_WAITER_STATUS, ACT_UPDATE_WAITER_SURNAME
} from "../../actions/ActionTypes";
import {EditorStatus} from "../StoresUtils";
import locationsStore from "../../stores/LocationsStore";
import {findByUuid} from "../../utils/Utils";
import {WaitersCreatorActionTypes} from "./WaitersCreatorActions";
import {WaitersEditorActions, WaitersEditorActionTypes} from "./WaitersEditorActions";
import {EntitiesUtils} from "../../utils/EntitiesUtils";
import {ApplicationActionTypes} from "../../actions/ApplicationActions";
import applicationStore from "../../stores/ApplicationStore";

const {Map} = require('immutable');

const EVT_WAITERS_PAGE_STORE_CHANGED = "EVT_WAITERS_PAGE_STORE_CHANGED";

class WaitersPageStore extends AbstractStore{

    constructor(){
        super(EVT_WAITERS_PAGE_STORE_CHANGED);
        this.waiter = null;
        this.editorStatus = EditorStatus.SURFING;
        this.page = 0;
    }

    setName(value){
        this.inCreationWaiter = this.inCreationWaiter.set('name', value);
    }

    setSurname(value){
        this.inCreationWaiter = this.inCreationWaiter.set('surname', value);
    }

    setCf(value){
        this.inCreationWaiter = this.inCreationWaiter.set('cf', value);
    }

    setStatus(value){
        this.inCreationWaiter = this.inCreationWaiter.set('status', value);
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([waitersStore.getToken(), applicationStore.getToken()]);
        switch (action.type) {
            case ApplicationActionTypes.LOAD_SETTINGS:
            case ApplicationActionTypes.STORE_SETTINGS:
            case ACT_RETRIEVE_WAITERS:
                break;
            case WaitersCreatorActionTypes.CREATE_WAITER:
            case WaitersEditorActionTypes.UPDATE_EDITING_WAITER:
                this.waiter = action.body.get('uuid');
                this.editorStatus = EditorStatus.EDITING;
                break;
            case WaitersEditorActionTypes.DESELECT_EDITING_WAITER:
            case WaitersEditorActionTypes.DELETE_EDITING_WAITER:
            case WaitersCreatorActionTypes.ABORT_WAITER_CREATION:
            case ApplicationActionTypes.GO_TO_PAGE:
                this.waiter = null;
                this.editorStatus = EditorStatus.SURFING;
                break;
            case WaitersCreatorActionTypes.BEGIN_WAITER_CREATION:
                this.waiter = EntitiesUtils.newWaiter();
                this.editorStatus = EditorStatus.CREATING;
                break;
            case WaitersEditorActionTypes.SELECT_EDITING_WAITER:
                this.waiter = action.body;
                this.editorStatus = EditorStatus.EDITING;
                break;
            case WaitersEditorActionTypes.SELECT_EDITING_WAITER_PAGE:
                this.page = action.body;
                break;
            case WaitersCreatorActionTypes.SET_CREATING_WAITER_NAME:
                this.waiter = this.waiter.set('name', action.body);
                break;
            case WaitersCreatorActionTypes.SET_CREATING_WAITER_SURNAME:
                this.waiter = this.waiter.set('surname', action.body);
                break;
            case WaitersCreatorActionTypes.SET_CREATING_WAITER_CF:
                this.waiter = this.waiter.set('cf', action.body);
                break;
            case WaitersCreatorActionTypes.SET_CREATING_WAITER_STATUS:
                this.waiter = this.waiter.set('status', action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getState(){
        let data = Map({
            settings: applicationStore.getSettings(),
            waiters: waitersStore.getWaiters().getPayload(),
            waiterStatuses: waiterStatusesStore.getWaiterStatuses().getPayload(),

            editorStatus: this.editorStatus,
            page: this.page,
            waiter: this.getSelectedWaiter()
        });
        return {
            data: data
        }
    }

    getSelectedWaiter(){
        if (this.editorStatus === EditorStatus.EDITING) {
            return findByUuid(waitersStore.getWaiters().getPayload(), this.waiter);
        } else if (this.editorStatus === EditorStatus.CREATING) {
            return this.waiter;
        }
        return null;
    }

}

const waitersPageStore = new WaitersPageStore();
export default waitersPageStore;