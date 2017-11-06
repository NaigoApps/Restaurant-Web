import {
    ACT_BEGIN_CREATE_CATEGORY,
    ACT_CREATE_CATEGORY,
    ACT_SELECT_CATEGORY,
    ACT_UPDATE_CATEGORY_CREATOR_NAME
} from "../actions/ActionTypes";
import AbstractStore from "./AbstractStore";

export const EVT_CATEGORY_CREATOR_CHANGED = "EVT_CATEGORY_CREATOR_CHANGED";

class CategoryCreatorStore extends AbstractStore {

    constructor() {
        super();
        this.name = "";
        this.clear();
    }

    clear(){
        this.creating = false;
    }

    setName(value){
        this.name = value;
    }

    reset(){
        this.name = "";
        this.creating = true;
    }

    getCategory(){
        if(this.creating) {
            return {
                name: this.name
            };
        }
        return null;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_BEGIN_CREATE_CATEGORY:
                this.reset();
                break;
            case ACT_UPDATE_CATEGORY_CREATOR_NAME:
                this.setName(action.body);
                break;
            case ACT_CREATE_CATEGORY:
                this.clear();
                break;
            case ACT_SELECT_CATEGORY:
                this.clear();
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_CATEGORY_CREATOR_CHANGED;
    }

}

const categoryCreatorStore = new CategoryCreatorStore();
export default categoryCreatorStore;