import {
    ACT_BEGIN_CREATE_DISH,
    ACT_CREATE_DISH,
    ACT_UPDATE_DISH_CREATOR_DESCRIPTION,
    ACT_UPDATE_DISH_CREATOR_NAME,
    ACT_UPDATE_DISH_CREATOR_PRICE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";


class DishesCreatorActions {

    beginDishCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_DISH);
    }

    createDish(dish) {
        asyncActionBuilder.post(
            ACT_CREATE_DISH,
            'dishes',
            dish
        );
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

    createDish(dish) {
        asyncActionBuilder.post(ACT_CREATE_DISH, 'dishes', dish);
    }
}

const dishesCreatorActions = new DishesCreatorActions();
export default dishesCreatorActions;