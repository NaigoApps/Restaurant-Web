import {ACT_RETRIEVE_DISH_STATUSES} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "../AbstractEntityStore";

export const EVT_DISHES_STATUSES_STORE_CHANGED = "EVT_DISHES_STATUSES_STORE_CHANGED";

class DishesStatusesStore extends AbstractEntityStore {

    constructor(){
        super(EVT_DISHES_STATUSES_STORE_CHANGED);
    }

    getDishesStatuses() {
        return this.getLazyData().getPayload();
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
                this.setSimpleData(action.body);
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