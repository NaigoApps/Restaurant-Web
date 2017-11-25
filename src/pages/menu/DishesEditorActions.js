import {
    ACT_BEGIN_CREATE_DISH,
    ACT_CREATE_DISH, ACT_DELETE_DISH, ACT_DESELECT_DISH,
    ACT_RETRIEVE_DISH_STATUSES,
    ACT_RETRIEVE_DISHES,
    ACT_SELECT_DISH,
    ACT_UPDATE_DISH, ACT_UPDATE_DISH_CREATOR_DESCRIPTION, ACT_UPDATE_DISH_CREATOR_NAME, ACT_UPDATE_DISH_CREATOR_PRICE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import categoriesActions from "./CategoriesActions";
import asyncActionBuilder from "../../actions/RequestBuilder";
import categoriesEditorActions from "./CategoriesEditorActions";


class DishesEditorActions {

    updateDishName(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/name',
            value
        );
    }

    updateDishDescription(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/description',
            value
        );
    }

    updateDishPrice(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/price',
            value
        );
    }

    updateDishStatus(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/status',
            value
        );
    }

    updateDishCategory(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_DISH, 'dishes/' + uuid + '/category', value);
    }

    deleteDish(dish) {
        asyncActionBuilder.remove(ACT_DELETE_DISH, 'dishes', dish)
    }

    selectDish(dish) {
        dispatcher.fireEnd(ACT_SELECT_DISH, dish);
    }

    deselectDish() {
        dispatcher.fireEnd(ACT_DESELECT_DISH);
    }

}

const dishesEditorActions = new DishesEditorActions();
export default dishesEditorActions;