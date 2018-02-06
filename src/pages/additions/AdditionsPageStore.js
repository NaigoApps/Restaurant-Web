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
import additionsStore from "../../stores/generic/AdditionsStore";

const {Map} = require('immutable');

const EVT_ADDITIONS_PAGE_STORE_CHANGED = "EVT_ADDITIONS_PAGE_STORE_CHANGED";

class AdditionsPageStore extends AbstractStore{

    constructor(){
        super(EVT_ADDITIONS_PAGE_STORE_CHANGED);
        this.selectedAddition = null;
        this.inCreationAddition = null;
    }

    setName(value){
        this.inCreationAddition = this.inCreationAddition.set('name', value);
    }

    setPrice(value){
        this.inCreationAddition = this.inCreationAddition.set('price', value);
    }

    setGeneric(value){
        this.inCreationAddition = this.inCreationAddition.set('generic', value);
    }

    handleCompletedAction(action){
        let changed = true;
        dispatcher.waitFor([additionsStore.getToken()]);
        switch (action.type) {
            case ACT_RETRIEVE_ADDITIONS:
                break;
            case ACT_CREATE_ADDITION:
                this.selectedAddition = action.body.get('uuid');
                this.inCreationAddition = null;
                break;
            case ACT_UPDATE_ADDITION:
                this.selectedAddition = action.body.get('uuid');
                break;
            case ACT_DELETE_ADDITION:
                this.selectedAddition = null;
                break;
            case ACT_BEGIN_CREATE_ADDITION:
                this.selectedAddition = null;
                this.inCreationAddition = this.buildAddition();
                break;
            case ACT_SELECT_ADDITION:
                this.selectedAddition = action.body.get('uuid');
                this.inCreationAddition = null;
                break;
            case ACT_DESELECT_ADDITION:
                this.selectedAddition = null;
                this.inCreationAddition = null;
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
        return Map({
            name: "",
            price: 0,
            generic: false
        });
    }

    getState(){
        let value = Map({
            additions: additionsStore.getAdditions().getPayload(),

            selectedAddition: this.selectedAddition,
            createdAddition: this.inCreationAddition
        });
        return {
            data: value
        };
    }

}

const additionsPageStore = new AdditionsPageStore();
export default additionsPageStore;