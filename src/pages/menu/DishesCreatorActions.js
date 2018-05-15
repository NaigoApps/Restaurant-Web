import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const DishesCreatorActionTypes = {
    BEGIN_DISH_CREATION: "BEGIN_DISH_CREATION",
    CREATE_DISH: "CREATE_DISH",
    SET_CREATING_DISH_NAME: "SET_CREATING_DISH_NAME",
    SET_CREATING_DISH_DESCRIPTION: "SET_CREATING_DISH_DESCRIPTION",
    SET_CREATING_DISH_PRICE: "SET_CREATING_DISH_PRICE",
    ABORT_DISH_CREATION: "ABORT_DISH_CREATION",
};

export const DishesCreatorActions = {

    beginDishCreation: () =>
        dispatcher.fireEnd(
            DishesCreatorActionTypes.BEGIN_DISH_CREATION
        ),

    onConfirm: (dish) =>
        asyncActionBuilder.post(
            DishesCreatorActionTypes.CREATE_DISH,
            'dishes',
            dish
        ),

    confirmName: (uuid, name) =>
        dispatcher.fireEnd(
            DishesCreatorActionTypes.SET_CREATING_DISH_NAME,
            name
        ),

    confirmDescription: (uuid, desc) =>
        dispatcher.fireEnd(
            DishesCreatorActionTypes.SET_CREATING_DISH_DESCRIPTION,
            desc
        ),

    confirmPrice: (uuid, price) =>
        dispatcher.fireEnd(
            DishesCreatorActionTypes.SET_CREATING_DISH_PRICE,
            price
        ),

    onAbort: () =>
        dispatcher.fireEnd(
            DishesCreatorActionTypes.ABORT_DISH_CREATION,
        ),
};