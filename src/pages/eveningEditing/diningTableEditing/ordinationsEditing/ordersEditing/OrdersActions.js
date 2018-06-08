import dispatcher from "../../../../../dispatcher/SimpleDispatcher";

const {Map} = require('immutable');

export const OrdersActionTypes = {
    BEGIN_ORDERS_EDITING: "BEGIN_ORDERS_EDITING",
    SELECT_WIZARD_PAGE: "SELECT_WIZARD_PAGE",

    SELECT_CATEGORY : "SELECT_CATEGORY",
    SELECT_CATEGORY_PAGE: "SELECT_CATEGORY_PAGE",
    SELECT_DISH: "SELECT_DISH",
    SELECT_DISH_PAGE: "SELECT_DISH_PAGE",
    SELECT_PHASE: "SELECT_PHASE",
    QUANTITY_CONFIRM: "QUANTITY_CONFIRM",
    SELECT_GROUP: "SELECT_GROUP",
    TOGGLE_GROUP_EDITING: "TOGGLE_GROUP_EDITING",
    REMOVE_GROUP: "REMOVE_GROUP",
    SELECT_ADDITION_PAGE: "SELECT_ADDITION_PAGE",
    TOGGLE_ADDITION: "TOGGLE_ADDITION",
    SET_FREE_ADDITION: "SET_FREE_ADDITION",
    SET_PRICE: "SET_PRICE",
    SET_QUANTITY: "SET_QUANTITY",
    ORDER_PHASE: "ORDER_PHASE",
};

export const OrdersActions = {
    beginOrdersEditing: (orders) => dispatcher.fireEnd(OrdersActionTypes.BEGIN_ORDERS_EDITING, orders),

    selectWizardPage: (page) => dispatcher.fireEnd(OrdersActionTypes.SELECT_WIZARD_PAGE, page),

    selectCategory: (cat) => dispatcher.fireEnd(OrdersActionTypes.SELECT_CATEGORY, cat),
    selectCategoryPage: (page) => dispatcher.fireEnd(OrdersActionTypes.SELECT_CATEGORY_PAGE, page),

    selectDish: (cat) => dispatcher.fireEnd(OrdersActionTypes.SELECT_DISH, cat),
    selectDishPage: (page) => dispatcher.fireEnd(OrdersActionTypes.SELECT_DISH_PAGE, page),

    selectPhase: (phase) => dispatcher.fireEnd(OrdersActionTypes.SELECT_PHASE, phase),

    quantityConfirm: (value) => dispatcher.fireEnd(OrdersActionTypes.QUANTITY_CONFIRM, value),

    selectGroup: (grp) => dispatcher.fireEnd(OrdersActionTypes.SELECT_GROUP, grp),
    toggleGroupEditing: grp => dispatcher.fireEnd(OrdersActionTypes.TOGGLE_GROUP_EDITING, grp),
    removeGroup: (grp) => dispatcher.fireEnd(OrdersActionTypes.REMOVE_GROUP, grp),

    selectAdditionPage: (page) => dispatcher.fireEnd(OrdersActionTypes.SELECT_ADDITION_PAGE, page),
    toggleAddition: (addition) => dispatcher.fireEnd(OrdersActionTypes.TOGGLE_ADDITION, addition),

    setFreeAddition: text => dispatcher.fireEnd(OrdersActionTypes.SET_FREE_ADDITION, text),
    setPrice: value => dispatcher.fireEnd(OrdersActionTypes.SET_PRICE, value),
    setQuantity: value => dispatcher.fireEnd(OrdersActionTypes.SET_QUANTITY, value),
    editOrderPhase: phase => dispatcher.fireEnd(OrdersActionTypes.ORDER_PHASE, phase),
};