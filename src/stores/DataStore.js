import {STATUSES} from "./LazyData";
import RootFeatureStore from "./RootFeatureStore";
import Category from "../model/Category";
import Location from "../model/Location";
import Dish from "../model/Dish";
import Addition from "../model/Addition";
import {EntitiesUtils} from "../utils/EntitiesUtils";
import Printer from "../model/Printer";
import {DataActionTypes} from "../actions/DataActions";
import {PrintersPageActionTypes} from "../pages/printers/PrintersPageActions";
import {LocationsPageActionTypes} from "../pages/locations/LocationsPageActions";
import {TablesPageActions} from "../pages/tables/TablesPageActions";
import RestaurantTable from "../model/RestaurantTable";
import {WaitersPageActions} from "../pages/waiters/WaitersPageActions";
import Waiter from "../model/Waiter";
import {CategoriesPageActions} from "../pages/categories/CategoriesPageActions";
import {DishesPageActions} from "../pages/dishes/DishesPageActions";

const EVT = "DATA_EVENT";

export const Topics = {
    CATEGORIES: "CATEGORIES",
    DISHES: "DISHES",
    ADDITIONS: "ADDITIONS",
    LOCATIONS: "LOCATIONS",
    RESTAURANT_TABLES: "RESTAURANT_TABLES",
    DISH_STATUSES: "DISH_STATUSES",
    PRINTERS: "PRINTERS",
    PRINTER_SERVICES: "PRINTER_SERVICES",
    WAITERS: "WAITERS",
    WAITER_STATUSES: "WAITER_STATUSES"
};

class DataStore extends RootFeatureStore {
    constructor() {
        super(EVT);
        this.status = STATUSES.NOT_LOADED;
        this.pool = {};
        this.topics = {
            CATEGORIES: [],
            LOCATIONS: [],
            DISHES: [],
            ADDITIONS: [],
            DISH_STATUSES: [],
            PRINTER_SERVICES: [],
            PRINTERS: [],
            RESTAURANT_TABLES: [],
            WAITERS: [],
            WAITER_STATUSES: []
        };
    }

    clearData() {
        this.pool = {};
        this.status = STATUSES.NOT_LOADED;
    }

    setStatus(status) {
        this.status = status;
    }

    isLoaded() {
        return this.status === STATUSES.LOADED;
    }

    isNotLoaded() {
        return this.status === STATUSES.NOT_LOADED;
    }

    isLoading() {
        return this.status === STATUSES.LOADING;
    }

    replaceEntities(entities, converter, topic, comparator) {
        this.topics[topic].forEach(e => delete this.pool[e.uuid]);
        this.topics[topic] = [];

        entities = entities.map(e => {
            return converter(e, this.pool)
        });

        entities.forEach(e => {
            this.pool[e.uuid] = e;
        });
        this.topics[topic] = entities.sort(comparator);
    }

    createEntity(entity, converter, topic, comparator) {
        entity = converter(entity, this.pool);

        this.pool[entity.uuid] = entity;
        this.topics[topic].push(entity);

        this.topics[topic].sort(comparator);

        return entity;
    }

    deleteEntity(uuid, topic) {
        delete this.pool[uuid];

        const index = this.topics[topic].findIndex(entity => entity.uuid === uuid);
        if (index !== -1) {
            this.topics[topic].splice(index, 1);
        }
    }

    updateEntity(entity, converter, topic, comparator) {
        this.deleteEntity(entity.uuid || entity, topic);
        return this.createEntity(entity, converter, topic, comparator);
    }

    receiveDishStatuses(statuses) {
        this.topics[Topics.DISH_STATUSES] = statuses;
        this.topics[Topics.DISH_STATUSES].sort((s1, s2) => s1.localeCompare(s2));
    }

    receiveWaiterStatuses(statuses) {
        this.topics[Topics.WAITER_STATUSES] = statuses;
        this.topics[Topics.WAITER_STATUSES].sort((s1, s2) => s1.localeCompare(s2));
    }

    receivePrinterServices(services) {
        this.topics[Topics.PRINTER_SERVICES] = services;
        this.topics[Topics.PRINTER_SERVICES].sort((s1, s2) => s1.localeCompare(s2));
    }

    getEntities(topic) {
        return this.topics[topic].slice();
    }

    getEntity(uuid) {
        return this.pool[uuid];
    }

    getPool() {
        return this.pool;
    }

    getCompletionHandlers() {
        const handlers = {};
        this.addLoadHandlers(handlers);
        this.addCategoryHandlers(handlers);
        this.addDishHandlers(handlers);
        this.addPrinterHandlers(handlers);
        this.addLocationHandlers(handlers);
        this.addRTablesHandlers(handlers);
        this.addWaitersHandlers(handlers);
        return handlers;
    }

    addLoadHandlers(handlers) {
        handlers[DataActionTypes.LOAD_ADDITIONS] = (adds) =>
            this.replaceEntities(adds.toJS(), Addition.create, Topics.ADDITIONS, EntitiesUtils.nameComparator);

        handlers[DataActionTypes.LOAD_DISH_STATUSES] = (statuses) =>
            this.receiveDishStatuses(statuses.toJS());
        handlers[DataActionTypes.LOAD_PRINTER_SERVICES] = (services) =>
            this.receivePrinterServices(services.toJS());
    }

    addDishHandlers(handlers) {
        handlers[DataActionTypes.LOAD_DISHES] = (dishes) =>
            this.replaceEntities(dishes.toJS(), Dish.create, Topics.DISHES, EntitiesUtils.nameComparator);
        handlers[DishesPageActions.CREATE_DISH] = (dish) =>
            this.createEntity(dish.toJS(), Dish.create, Topics.DISHES, EntitiesUtils.nameComparator);
        handlers[DishesPageActions.UPDATE_EDITING_DISH] = (dishDTO) => {
            const dish = this.updateEntity(dishDTO.toJS(), Dish.create, Topics.DISHES, EntitiesUtils.nameComparator);
            const categories = this.getEntities(Topics.CATEGORIES);
            categories.forEach(category => {
                if(category.hasDish(dish)){
                    category.removeDish(dish);
                }
            });
            dish.category.addDish(dish);
        };
        handlers[DishesPageActions.DELETE_EDITING_DISH] = (uuid) =>
            this.deleteEntity(uuid, Topics.DISHES);
    }

    addCategoryHandlers(handlers) {
        handlers[DataActionTypes.LOAD_CATEGORIES] = (categories) =>
            this.replaceEntities(categories.toJS(), Category.create, Topics.CATEGORIES, EntitiesUtils.nameComparator);
        handlers[CategoriesPageActions.CREATE_CATEGORY] = (category) =>
            this.createEntity(category.toJS(), Category.create, Topics.CATEGORIES, EntitiesUtils.nameComparator);
        handlers[CategoriesPageActions.UPDATE_EDITING_CATEGORY] = (category) =>
            this.updateEntity(category.toJS(), Category.create, Topics.CATEGORIES, EntitiesUtils.nameComparator);
        handlers[CategoriesPageActions.DELETE_EDITING_CATEGORY] = (uuid) =>
            this.deleteEntity(uuid, Topics.CATEGORIES);
    }

    addPrinterHandlers(handlers) {
        handlers[DataActionTypes.LOAD_PRINTERS] = (printers) =>
            this.replaceEntities(printers.toJS(), Printer.create, Topics.PRINTERS, EntitiesUtils.nameComparator);
        handlers[PrintersPageActionTypes.CREATE_PRINTER] = (printer) =>
            this.createEntity(printer.toJS(), Printer.create, Topics.PRINTERS, EntitiesUtils.nameComparator);
        handlers[PrintersPageActionTypes.UPDATE_EDITING_PRINTER] = (printer) =>
            this.updateEntity(printer.toJS(), Printer.create, Topics.PRINTERS, EntitiesUtils.nameComparator);
        handlers[PrintersPageActionTypes.DELETE_EDITING_PRINTER] = (uuid) =>
            this.deleteEntity(uuid, Topics.PRINTERS);
    }

    addLocationHandlers(handlers) {
        handlers[DataActionTypes.LOAD_LOCATIONS] = (locations) =>
            this.replaceEntities(locations.toJS(), Location.create, Topics.LOCATIONS, EntitiesUtils.nameComparator);
        handlers[LocationsPageActionTypes.CREATE_LOCATION] = (location) =>
            this.createEntity(location.toJS(), Location.create, Topics.LOCATIONS, EntitiesUtils.nameComparator);
        handlers[LocationsPageActionTypes.UPDATE_EDITING_LOCATION] = (location) =>
            this.updateEntity(location.toJS(), Location.create, Topics.LOCATIONS, EntitiesUtils.nameComparator);
        handlers[LocationsPageActionTypes.DELETE_EDITING_LOCATION] = (uuid) =>
            this.deleteEntity(uuid, Topics.LOCATIONS);
    }

    addRTablesHandlers(handlers) {
        handlers[DataActionTypes.LOAD_RESTAURANT_TABLES] = (tables) =>
            this.replaceEntities(tables.toJS(), RestaurantTable.create, Topics.RESTAURANT_TABLES, EntitiesUtils.nameComparator);
        handlers[TablesPageActions.CREATE_R_TABLE] = (table) =>
            this.createEntity(table.toJS(), RestaurantTable.create, Topics.RESTAURANT_TABLES, EntitiesUtils.nameComparator);
        handlers[TablesPageActions.UPDATE_R_TABLE] = (table) =>
            this.updateEntity(table.toJS(), RestaurantTable.create, Topics.RESTAURANT_TABLES, EntitiesUtils.nameComparator);
        handlers[TablesPageActions.DELETE_EDITING_R_TABLE] = (uuid) =>
            this.deleteEntity(uuid, Topics.RESTAURANT_TABLES);
    }

    addWaitersHandlers(handlers) {
        handlers[DataActionTypes.LOAD_WAITER_STATUSES] = (statuses) =>
            this.receiveWaiterStatuses(statuses);

        handlers[DataActionTypes.LOAD_WAITERS] = (waiters) =>
            this.replaceEntities(waiters.toJS(), Waiter.create, Topics.WAITERS, EntitiesUtils.nameComparator);
        handlers[WaitersPageActions.CREATE_WAITER] = (waiter) =>
            this.createEntity(waiter.toJS(), Waiter.create, Topics.WAITERS, EntitiesUtils.nameComparator);
        handlers[WaitersPageActions.UPDATE_EDITING_WAITER] = (waiter) =>
            this.updateEntity(waiter.toJS(), Waiter.create, Topics.WAITERS, EntitiesUtils.nameComparator);
        handlers[WaitersPageActions.DELETE_EDITING_WAITER] = (uuid) =>
            this.deleteEntity(uuid, Topics.WAITERS);
    }
}

const dataStore = new DataStore();
export default dataStore;
