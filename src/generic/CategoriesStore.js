import {
    ACT_BEGIN_CREATE_CATEGORY,
    ACT_CREATE_CATEGORY,
    ACT_DELETE_CATEGORY,
    ACT_RETRIEVE_CATEGORIES,
    ACT_SELECT_CATEGORY,
    ACT_UPDATE_CATEGORY
} from "../actions/ActionTypes";
import {strcmp} from "../utils/Utils";
import {STATUSES} from "../stores/LazyData";
import AbstractEntityStore from "../stores/AbstractEntityStore";

export const EVT_CATEGORIES_STORE_CHANGED = "EVT_CATEGORIES_STORE_CHANGED";

class CategoriesStore extends AbstractEntityStore {

    constructor() {
        super();
        this.selectedCategory = null;
    }

    setSelectedCategory(uuid) {
        this.selectedCategory = uuid;
    }

    getSelectedCategory(){
        return this.selectedCategory;
    }

    getAllCategories() {
        return this.getLazyData().getPayload()
            .sort((c1, c2) => strcmp(c1.name, c2.name));
    }

    getMenu(){
        let menu = this.getAllCategories();
        if(menu.isLoaded()){
            menu.getPayload().forEach(cat => {
                cat.dishes = cat.dishes.filter(dish => dish.status = "ATTIVO");
            })
        }
        return menu;
    }

    handleStartedAction(action){
        let changed = true;
        switch (action.type){
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
                this.setSelectedCategory(action.body.uuid);
                break;
            case ACT_DELETE_CATEGORY:
                this.deleteData(action.body);
                break;
            case ACT_BEGIN_CREATE_CATEGORY:
                this.setSelectedCategory(null);
                break;
            case ACT_SELECT_CATEGORY:
                this.setSelectedCategory(action.body);
                break;
            default:
                changed = false;
                break;
        }
        return changed;
    }

    getChangeEvent(){
        return EVT_CATEGORIES_STORE_CHANGED;
    }

}

const categoriesStore = new CategoriesStore();
export default categoriesStore;