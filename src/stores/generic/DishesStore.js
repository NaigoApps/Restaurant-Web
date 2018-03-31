import {ACT_CREATE_DISH, ACT_DELETE_DISH, ACT_RETRIEVE_DISHES, ACT_UPDATE_DISH} from "../../actions/ActionTypes";
import {STATUSES} from "../LazyData";
import AbstractEntityStore from "./AbstractEntityStore";

export const EVT_DISHES_STORE_CHANGED = "EVT_DISHES_STORE_CHANGED";

class DishesStore extends AbstractEntityStore {

    constructor() {
        super(EVT_DISHES_STORE_CHANGED);
    }

    getDishes() {
        return this.getData();
    }

    comparator(d1, d2){
        return d1.get('name').toLowerCase().localeCompare(d2.get('name').toLowerCase());
    }

    getDishesByCategory(uuid) {
        return this.getData().getPayload()
            .filter(d => d.get('category') === uuid);
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