import {
    ACT_CREATE_CATEGORY,
    ACT_DELETE_CATEGORY,
    ACT_RETRIEVE_CATEGORIES,
    ACT_UPDATE_CATEGORY
} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_CATEGORIES_STORE_CHANGED = "EVT_CATEGORIES_STORE_CHANGED";

class CategoriesStore extends AbstractEntityStore {

    constructor() {
        super();
    }

    getCategories() {
        return this.getData();
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_CATEGORIES:
                this.setStatus(STATUSES.LOADING);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    handleCompletedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_CATEGORIES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_CREATE_CATEGORY:
                this.createData(action.body);
                break;
            case ACT_UPDATE_CATEGORY:
                this.updateData(action.body);
                break;
            case ACT_DELETE_CATEGORY:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent() {
        return EVT_CATEGORIES_STORE_CHANGED;
    }

}

const categoriesStore = new CategoriesStore();
export default categoriesStore;