import AbstractStore from "../../stores/AbstractStore";
import waitersStore from "../../generic/WaitersStore";
import waiterStatusesStore from "../../generic/WaiterStatusesStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_WAITER, ACT_CREATE_WAITER, ACT_DELETE_WAITER, ACT_DESELECT_WAITER, ACT_RETRIEVE_WAITERS,
    ACT_SELECT_WAITER,
    ACT_UPDATE_WAITER, ACT_UPDATE_WAITER_CF, ACT_UPDATE_WAITER_NAME, ACT_UPDATE_WAITER_STATUS, ACT_UPDATE_WAITER_SURNAME
} from "../../actions/ActionTypes";

const EVT_WAITERS_PAGE_STORE_CHANGED = "EVT_WAITERS_PAGE_STORE_CHANGED";

class WaitersPageStore extends AbstractStore{

    constructor(){
        super(EVT_WAITERS_PAGE_STORE_CHANGED);
        this.selectedWaiter = null;
        this.inCreationWaiter = null;
    }

    setName(value){
        this.inCreationWaiter.name = value;
    }

    setSurname(value){
        this.inCreationWaiter.surname = value;
    }

    setCf(value){
        this.inCreationWaiter.cf = value;
    }

    setStatus(value){
        this.inCreationWaiter.status = value;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([waitersStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_WAITERS:
                break;
            case ACT_CREATE_WAITER:
                this.selectedWaiter = action.body.uuid;
                this.inCreationWaiter = null;
                break;
            case ACT_UPDATE_WAITER:
                this.selectedWaiter = action.body.uuid;
                break;
            case ACT_DELETE_WAITER:
                this.selectedWaiter = null;
                break;
            case ACT_BEGIN_CREATE_WAITER:
                this.selectedWaiter = null;
                this.inCreationWaiter = this.buildWaiter();
                break;
            case ACT_SELECT_WAITER:
                this.selectedWaiter = action.body;
                this.inCreationWaiter = null;
                break;
            case ACT_DESELECT_WAITER:
                this.selectedWaiter = null;
                this.inCreationWaiter = null;
                break;
            case ACT_UPDATE_WAITER_NAME:
                this.setName(action.body);
                break;
            case ACT_UPDATE_WAITER_SURNAME:
                this.setSurname(action.body);
                break;
            case ACT_UPDATE_WAITER_CF:
                this.setCf(action.body);
                break;
            case ACT_UPDATE_WAITER_STATUS:
                this.setStatus(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildWaiter(){
        return {
            name: "",
            surname: "",
            cf: "",
            status: ""
        };
    }

    getState(){
        return {
            waiters: waitersStore.getWaiters(),
            waiterStatuses: waiterStatusesStore.getWaiterStatuses(),

            selectedWaiter: this.selectedWaiter,
            inCreationWaiter: this.inCreationWaiter
        }
    }

}

const waitersPageStore = new WaitersPageStore();
export default waitersPageStore;