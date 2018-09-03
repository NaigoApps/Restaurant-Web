import {ACT_RETRIEVE_DISH_STATUSES} from "../../actions/DataActions";
import {STATUSES} from "../LazyData";
import AbstractDataStore from "../AbstractDataStore";

export const EVT_DISHES_STATUSES_STORE_CHANGED = "EVT_DISHES_STATUSES_STORE_CHANGED";

class DishesStatusesStore extends AbstractDataStore{

    constructor(){
        super(EVT_DISHES_STATUSES_STORE_CHANGED);
    }

    getDishesStatuses() {
        return this.getData();
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_DISH_STATUSES:
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
            case ACT_RETRIEVE_DISH_STATUSES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const dishesStatusesStore = new DishesStatusesStore();
export default dishesStatusesStore;