import {
    ACT_BEGIN_CREATE_DISH,
    ACT_CREATE_DISH, ACT_DESELECT_DISH,
    ACT_RETRIEVE_DISH_STATUSES,
    ACT_RETRIEVE_DISHES,
    ACT_SELECT_DISH,
    ACT_UPDATE_DISH, ACT_UPDATE_DISH_CREATOR_DESCRIPTION, ACT_UPDATE_DISH_CREATOR_NAME, ACT_UPDATE_DISH_CREATOR_PRICE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import categoriesActions from "./CategoriesActions";
import asyncActionBuilder from "../../actions/RequestBuilder";


class DishesActions {

    retrieveDishesByCategory(uuid) {
        return asyncActionBuilder.get(
            ACT_RETRIEVE_DISHES,
            'dishes',
            {category: uuid});
    }

    retrieveAllDishes() {
        asyncActionBuilder.get(ACT_RETRIEVE_DISHES, 'dishes/all');
    }

    beginCategoryDishCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_DISH);
    }

    createDish(dish) {
        asyncActionBuilder.post(
            ACT_CREATE_DISH,
            'dishes',
            dish
        );
    }

    updateImmediateDishName(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/name',
            value
        );
    }

    updateImmediateDishDescription(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/description',
            value
        );
    }

    updateImmediateDishPrice(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/price',
            value
        );
    }

    updateImmediateDishStatus(uuid, value) {
        asyncActionBuilder.put(
            ACT_UPDATE_DISH,
            'dishes/' + uuid + '/status',
            value
        );
    }

    updateImmediateDishCategory(uuid, value) {
        asyncActionBuilder.put(ACT_UPDATE_DISH, 'dishes/' + uuid + '/category', value)
            .then(() => categoriesActions.selectCategory(value));
    }

    retrieveDishesStatuses() {
        asyncActionBuilder.get(
            ACT_RETRIEVE_DISH_STATUSES,
            'dishes-statuses');
    }

    selectDish(dish) {
        dispatcher.fireEnd(ACT_SELECT_DISH, dish);
    }

    deselectDish() {
        dispatcher.fireEnd(ACT_DESELECT_DISH);
    }


    updateDishName(uuid, name){
        dispatcher.fireEnd(ACT_UPDATE_DISH_CREATOR_NAME, name);
    }

    updateDishDescription(uuid, desc){
        dispatcher.fireEnd(ACT_UPDATE_DISH_CREATOR_DESCRIPTION, desc);
    }

    updateDishPrice(uuid, price){
        dispatcher.fireEnd(ACT_UPDATE_DISH_CREATOR_PRICE, price);
    }

    createCategoryDish(dish) {
        asyncActionBuilder.post(ACT_CREATE_DISH, 'dishes', dish);
    }
}

const dishesActions = new DishesActions();
export default dishesActions;