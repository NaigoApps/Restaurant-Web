import dispatcher from "../../dispatcher/SimpleDispatcher";
import asyncActionBuilder from "../../actions/RequestBuilder";

export const DishesEditorActionTypes = {
    SELECT_EDITING_DISH: "SELECT_EDITING_DISH",
    DESELECT_EDITING_DISH: "DESELECT_EDITING_DISH",
    SELECT_EDITING_DISH_PAGE: "SELECT_EDITING_DISH_PAGE",
    UPDATE_EDITING_DISH: "UPDATE_EDITING_DISH",
    DELETE_EDITING_DISH: "DELETE_EDITING_DISH",
};

export const DishesEditorActions = {

    selectDish: (dish) =>
        dispatcher.fireEnd(
            DishesEditorActionTypes.SELECT_EDITING_DISH,
            dish
        ),

    deselectDish: () =>
        dispatcher.fireEnd(
            DishesEditorActionTypes.DESELECT_EDITING_DISH
        ),

    selectDishPage: (page) =>
        dispatcher.fireEnd(
            DishesEditorActionTypes.SELECT_EDITING_DISH_PAGE,
            page
        ),

    confirmName: (uuid, value) =>
        asyncActionBuilder.put(
            DishesEditorActionTypes.UPDATE_EDITING_DISH,
            'dishes/' + uuid + '/name',
            value
        ),

    confirmDescription: (uuid, value) =>
        asyncActionBuilder.put(
            DishesEditorActionTypes.UPDATE_EDITING_DISH,
            'dishes/' + uuid + '/description',
            value
        ),

    confirmPrice: (uuid, value) =>
        asyncActionBuilder.put(
            DishesEditorActionTypes.UPDATE_EDITING_DISH,
            'dishes/' + uuid + '/price',
            value
        ),

    confirmStatus: (uuid, value) =>
        asyncActionBuilder.put(
            DishesEditorActionTypes.UPDATE_EDITING_DISH,
            'dishes/' + uuid + '/status',
            value
        ),

    confirmCategory: (uuid, value) =>
        asyncActionBuilder.put(
            DishesEditorActionTypes.UPDATE_EDITING_DISH,
            'dishes/' + uuid + '/category',
            value),

    onDelete: (dish) =>
        asyncActionBuilder.remove(
            DishesEditorActionTypes.DELETE_EDITING_DISH,
            'dishes',
            dish
        ),
};