import AbstractStore from "../../stores/AbstractStore";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import {
    ACT_BEGIN_CREATE_ADDITION,
    ACT_CREATE_ADDITION,
    ACT_DELETE_ADDITION,
    ACT_DESELECT_ADDITION,
    ACT_RETRIEVE_ADDITIONS,
    ACT_SELECT_ADDITION,
    ACT_UPDATE_ADDITION,
    ACT_UPDATE_ADDITION_GENERIC,
    ACT_UPDATE_ADDITION_NAME,
    ACT_UPDATE_ADDITION_PRICE
} from "../../actions/ActionTypes";
import additionsStore from "../../generic/AdditionsStore";

const EVT_ADDITIONS_PAGE_STORE_CHANGED = "EVT_ADDITIONS_PAGE_STORE_CHANGED";

class AdditionsPageStore extends AbstractStore{

    constructor(){
        super(EVT_ADDITIONS_PAGE_STORE_CHANGED);
        this.selectedAddition = null;
        this.inCreationAddition = null;
    }

    setName(value){
        this.inCreationAddition.name = value;
    }

    setPrice(value){
        this.inCreationAddition.price = value;
    }

    setGeneric(value){
        this.inCreationAddition.generic = value;
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([additionsStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_ADDITIONS:
                break;
            case ACT_CREATE_ADDITION:
                this.selectedAddition = action.body.uuid;
                this.inCreationAddition = null;
                break;
            case ACT_UPDATE_ADDITION:
                this.selectedAddition = action.body.uuid;
                break;
            case ACT_DELETE_ADDITION:
                this.selectedAddition = null;
                break;
            case ACT_BEGIN_CREATE_ADDITION:
                this.selectedAddition = null;
                this.inCreationAddition = this.buildAddition();
                break;
            case ACT_SELECT_ADDITION:
                this.selectedAddition = action.body;
                this.inCreationAddition = null;
                break;
            case ACT_DESELECT_ADDITION:
                this.selectedAddition = null;
                break;
            case ACT_UPDATE_ADDITION_NAME:
                this.setName(action.body);
                break;
            case ACT_UPDATE_ADDITION_PRICE:
                this.setPrice(action.body);
                break;
            case ACT_UPDATE_ADDITION_GENERIC:
                this.setGeneric(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    buildAddition(){
        return {
            name: "",
            price: 0,
            generic: false
        };
    }

    getState(){
        return {
            additions: additionsStore.getAdditions(),

            selectedAddition: this.selectedAddition,
            inCreationAddition: this.inCreationAddition
        }
    }

}

const additionsPageStore = new AdditionsPageStore();
export default additionsPageStore;