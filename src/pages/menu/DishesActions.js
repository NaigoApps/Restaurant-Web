import {
    ACT_RETRIEVE_DISH_STATUSES,
    ACT_RETRIEVE_DISHES,
} from "../../actions/ActionTypes";
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

    retrieveDishesStatuses() {
        asyncActionBuilder.get(
            ACT_RETRIEVE_DISH_STATUSES,
            'dishes-statuses');
    }

}

const dishesActions = new DishesActions();
export default dishesActions;