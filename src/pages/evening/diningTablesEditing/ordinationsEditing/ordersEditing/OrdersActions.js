import dispatcher from "../../../../../dispatcher/SimpleDispatcher";

const {Map} = require('immutable');

export const OrdersActionTypes = {
    SELECT_CATEGORY : "SELECT_CATEGORY",
    SELECT_CATEGORY_PAGE: "SELECT_CATEGORY_PAGE",
    SELECT_DISH: "SELECT_DISH",
    SELECT_DISH_PAGE: "SELECT_DISH_PAGE",
    SELECT_PHASE: "SELECT_PHASE",
    QUANTITY_CHAR: "QUANTITY_CHAR",
    QUANTITY_CHANGE: "QUANTITY_CHANGE",
};

export const OrdersActions = {
    selectCategory: (cat) => dispatcher.fireEnd(OrdersActionTypes.SELECT_CATEGORY, cat),
    selectCategoryPage: (page) => dispatcher.fireEnd(OrdersActionTypes.SELECT_CATEGORY_PAGE, page),

    selectDish: (cat) => dispatcher.fireEnd(OrdersActionTypes.SELECT_DISH, cat),
    selectDishPage: (page) => dispatcher.fireEnd(OrdersActionTypes.SELECT_DISH_PAGE, page),

    selectPhase: (phase) => dispatcher.fireEnd(OrdersActionTypes.SELECT_PHASE, phase),

    quantityChar: (char) => dispatcher.fireEnd(OrdersActionTypes.QUANTITY_CHAR, char),
    quantityChange: (text) => dispatcher.fireEnd(OrdersActionTypes.QUANTITY_CHANGE, text),

};