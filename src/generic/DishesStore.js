import {ACT_CREATE_DISH, ACT_DELETE_DISH, ACT_RETRIEVE_DISHES, ACT_UPDATE_DISH} from "../actions/ActionTypes";
import {strcmp} from "../utils/Utils";
import {STATUSES} from "../stores/LazyData";
import AbstractEntityStore from "../stores/AbstractEntityStore";

export const EVT_DISHES_STORE_CHANGED = "EVT_DISHES_STORE_CHANGED";

class DishesStore extends AbstractEntityStore {

    constructor() {
        super(EVT_DISHES_STORE_CHANGED);
    }

    getAllActiveDishes(){
        return this.getLazyData().getPayload().filter(d => d.status === "ATTIVO");
    }

    getDishesByCategory(uuid) {
        return this.getLazyData().getPayload()
            .filter(d => d.category === uuid)
            .sort((d1, d2) => strcmp(d1.name.toUpperCase(), d2.name.toUpperCase()));
    }

    handleStartedAction(action) {
        let changed = true;
        switch (action.type) {
            case ACT_RETRIEVE_DISHES:
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
            case ACT_RETRIEVE_DISHES:
                this.setData(action.body);
                this.setStatus(STATUSES.LOADED);
                break;
            case ACT_CREATE_DISH:
                this.createData(action.body);
                break;
            case ACT_UPDATE_DISH:
                this.updateData(action.body);
                break;
            case ACT_DELETE_DISH:
                this.deleteData(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }
}

const dishesStore = new DishesStore();
export default dishesStore;