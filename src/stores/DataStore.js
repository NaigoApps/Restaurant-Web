import {STATUSES} from "./LazyData";
import AbstractStore from "./AbstractStore";
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
import AdditionsPageActions from "../pages/additions/AdditionsPageActions";
import CustomersPageActions from "../pages/customers/CustomersPageActions";
import Customer from "../model/Customer";
import EveningSelectorActions from "../pages/eveningEditing/eveningSelection/EveningSelectorActions";
import Evening from "../model/Evening";
import EveningEditorActions from "../pages/eveningEditing/EveningEditorActions";
import DiningTablesEditorActions from "../pages/eveningEditing/diningTableEditing/DiningTablesEditorActions";
import DiningTable from "../model/DiningTable";
import Phase from "../model/Phase";
import {ApplicationActions, ApplicationActionTypes} from "../actions/ApplicationActions";
import Page from "../pages/Page";
import {Pages} from "../App";

const EVT = "DATA_EVENT";

export const Topics = {
    CATEGORIES: "categories",
    DISHES: "dishes",
    ADDITIONS: "additions",
    LOCATIONS: "locations",
    RESTAURANT_TABLES: "tables",
    DISH_STATUSES: "dishStatuses",
    PRINTERS: "printers",
    PRINTER_SERVICES: "services",
    WAITERS: "waiters",
    CUSTOMERS: "customers",
    WAITER_STATUSES: "waiterStatuses",

    EVENINGS: "evenings",
    PHASES: "phases",
    DINING_TABLES: "diningTables",
    ORDINATIONS: "ordinations",
    ORDERS: "orders",
};

class DataStore extends AbstractStore {
    constructor() {
        super("data", EVT);
        this.status = STATUSES.NOT_LOADED;
        this.pool = {};
        this.topics = {};
        Object.keys(Topics).forEach(topic => {
            this.topics[Topics[topic]] = [];
        });
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

    clearTopic(topic) {
        this.topics[topic].forEach(e => delete this.pool[e.uuid]);
        this.topics[topic] = [];
    }

    replaceEntities(entities, converter, topic, comparator) {
        this.clearTopic(topic);

        entities = entities.map(e => {
            return converter(e, this.pool)
        });

        entities.forEach(e => {
            this.pool[e.uuid] = e;
        });

        this.topics[topic] = entities;

        if (comparator) {
            this.topics[topic].sort(comparator);
        }
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

    getActionsClass() {
        //FIXME Correct?
        return DataActionTypes;
    }

    buildState() {
        const state = {};
        Object.keys(Topics).forEach(topic => {
            state[Topics[topic]] = this.getEntities(Topics[topic]);
        });
        //The only exception
        if (this.getEntities(Topics.EVENINGS).length === 1) {
            state.evening = this.getEntities(Topics.EVENINGS)[0];
        }
        state.pool = this.pool;
        return state;
    }

    getEntities(topic) {
        return this.topics[topic].slice();
    }

    getEntity(uuid) {
        return this.pool[uuid];
    }

    getEvening() {
        return this.topics[Topics.EVENINGS].length > 0 ? this.topics[Topics.EVENINGS][0] : null;
    }

    getPool() {
        return this.pool;
    }

    getActionCompletedHandlers() {
        const handlers = {};
        this.addLoadHandlers(handlers);
        this.addCategoryHandlers(handlers);
        this.addAdditionHandlers(handlers);
        this.addDishHandlers(handlers);
        this.addPrinterHandlers(handlers);
        this.addLocationHandlers(handlers);
        this.addRTablesHandlers(handlers);
        this.addWaitersHandlers(handlers);
        this.addCustomersHandlers(handlers);

        this.addEveningHandlers(handlers);
        this.addDiningTablesHandlers(handlers);
        this.addPhasesHandlers(handlers);
        return handlers;
    }

    addPhasesHandlers(handlers) {
        handlers[DataActionTypes.LOAD_PHASES] = (phases) =>
            this.replaceEntities(phases, Phase.create, Topics.PHASES);
        return handlers;
    }

    addEveningHandlers(handlers) {

        handlers[ApplicationActionTypes.GO_TO_PAGE] = (page) => {
            if(page === Pages.EVENING_SELECTION){
                this.clearTopic(Topics.EVENINGS);
            }
        };

        DataStore.assign(handlers, [
                EveningSelectorActions.CHOOSE,
                EveningEditorActions.GET_SELECTED,
                DiningTablesEditorActions.MERGE_DINING_TABLE,
                EveningEditorActions.CONFIRM_COVER_CHARGE_EDITING],
            (evening) => this.replaceEntities([evening], Evening.create, Topics.EVENINGS));

        handlers[EveningEditorActions.DESELECT_EVENING] = () => this.clearTopic(Topics.EVENINGS);
        handlers[DiningTablesEditorActions.CREATE_DINING_TABLE] = (table) => this.getEvening().addTable(table);
    }

    addDiningTablesHandlers(handlers) {
        handlers[EveningEditorActions.LOAD_EVENING_TABLES] = tables => {
            this.replaceEntities(tables, DiningTable.create, Topics.DINING_TABLES, EntitiesUtils.defaultComparator("openingTime"))
        };

        handlers[EveningEditorActions.DESELECT_EVENING] = () => {
            this.clearTopic(Topics.EVENINGS);
            this.clearTopic(Topics.DINING_TABLES);
        };

        handlers[DiningTablesEditorActions.CREATE_DINING_TABLE] = (table) => {
            this.createEntity(table, DiningTable.create, Topics.DINING_TABLES);
        }
    }

    addLoadHandlers(handlers) {
        handlers[DataActionTypes.LOAD_ADDITIONS] = (adds) =>
            this.replaceEntities(adds, Addition.create, Topics.ADDITIONS, EntitiesUtils.nameComparator);

        handlers[DataActionTypes.LOAD_DISH_STATUSES] = (statuses) =>
            this.receiveDishStatuses(statuses);
        handlers[DataActionTypes.LOAD_PRINTER_SERVICES] = (services) =>
            this.receivePrinterServices(services);
    }

    addDishHandlers(handlers) {
        handlers[DataActionTypes.LOAD_DISHES] = (dishes) =>
            this.replaceEntities(dishes, Dish.create, Topics.DISHES, EntitiesUtils.nameComparator);

        handlers[DishesPageActions.CREATE_DISH] = (dish) =>
            this.createEntity(dish, Dish.create, Topics.DISHES, EntitiesUtils.nameComparator);

        handlers[DishesPageActions.UPDATE_EDITING_DISH] = (dishDTO) => {
            const categories = this.getEntities(Topics.CATEGORIES);
            categories.forEach(category => {
                if (category.hasDishUuid(dishDTO.uuid)) {
                    category.removeDishUuid(dishDTO.uuid);
                }
            });
            this.updateEntity(dishDTO, Dish.create, Topics.DISHES, EntitiesUtils.nameComparator);
        };
        handlers[DishesPageActions.DELETE_EDITING_DISH] = (uuid) => {
            const dish = this.getEntity(uuid);
            dish.category.removeDish(dish);
            this.deleteEntity(uuid, Topics.DISHES);
        }
    }

    addCategoryHandlers(handlers) {
        handlers[DataActionTypes.LOAD_CATEGORIES] = (categories) =>
            this.replaceEntities(categories, Category.create, Topics.CATEGORIES, EntitiesUtils.nameComparator);
        handlers[CategoriesPageActions.CREATE_CATEGORY] = (category) =>
            this.createEntity(category, Category.create, Topics.CATEGORIES, EntitiesUtils.nameComparator);
        handlers[CategoriesPageActions.UPDATE_EDITING_CATEGORY] = (category) =>
            this.updateEntity(category, Category.create, Topics.CATEGORIES, EntitiesUtils.nameComparator);
        handlers[CategoriesPageActions.DELETE_EDITING_CATEGORY] = (uuid) =>
            this.deleteEntity(uuid, Topics.CATEGORIES);
    }

    addAdditionHandlers(handlers) {
        handlers[DataActionTypes.LOAD_ADDITIONS] = (additions) =>
            this.replaceEntities(additions, Addition.create, Topics.ADDITIONS, EntitiesUtils.nameComparator);
        handlers[AdditionsPageActions.CREATE_ADDITION] = (addition) =>
            this.createEntity(addition, Addition.create, Topics.ADDITIONS, EntitiesUtils.nameComparator);
        handlers[AdditionsPageActions.UPDATE_EDITING_ADDITION] = (addition) =>
            this.updateEntity(addition, Addition.create, Topics.ADDITIONS, EntitiesUtils.nameComparator);
        handlers[AdditionsPageActions.DELETE_EDITING_ADDITION] = (uuid) =>
            this.deleteEntity(uuid, Topics.ADDITIONS);
    }

    addPrinterHandlers(handlers) {
        handlers[DataActionTypes.LOAD_PRINTERS] = (printers) =>
            this.replaceEntities(printers, Printer.create, Topics.PRINTERS, EntitiesUtils.nameComparator);
        handlers[PrintersPageActionTypes.CREATE_PRINTER] = (printer) =>
            this.createEntity(printer, Printer.create, Topics.PRINTERS, EntitiesUtils.nameComparator);
        handlers[PrintersPageActionTypes.UPDATE_EDITING_PRINTER] = (printer) =>
            this.updateEntity(printer, Printer.create, Topics.PRINTERS, EntitiesUtils.nameComparator);
        handlers[PrintersPageActionTypes.DELETE_EDITING_PRINTER] = (uuid) =>
            this.deleteEntity(uuid, Topics.PRINTERS);
    }

    addCustomersHandlers(handlers) {
        handlers[DataActionTypes.LOAD_CUSTOMERS] = (customers) =>
            this.replaceEntities(customers, Customer.create, Topics.CUSTOMERS, EntitiesUtils.nameComparator);
        handlers[CustomersPageActions.CREATE_CUSTOMER] = (customer) =>
            this.createEntity(customer, Customer.create, Topics.CUSTOMERS, EntitiesUtils.nameComparator);
        handlers[CustomersPageActions.UPDATE_EDITING_CUSTOMER] = (customer) =>
            this.updateEntity(customer, Customer.create, Topics.CUSTOMERS, EntitiesUtils.nameComparator);
        handlers[CustomersPageActions.DELETE_EDITING_CUSTOMER] = (uuid) =>
            this.deleteEntity(uuid, Topics.CUSTOMERS);
    }

    addLocationHandlers(handlers) {
        handlers[DataActionTypes.LOAD_LOCATIONS] = (locations) =>
            this.replaceEntities(locations, Location.create, Topics.LOCATIONS, EntitiesUtils.nameComparator);
        handlers[LocationsPageActionTypes.CREATE_LOCATION] = (location) =>
            this.createEntity(location, Location.create, Topics.LOCATIONS, EntitiesUtils.nameComparator);
        handlers[LocationsPageActionTypes.UPDATE_EDITING_LOCATION] = (location) =>
            this.updateEntity(location, Location.create, Topics.LOCATIONS, EntitiesUtils.nameComparator);
        handlers[LocationsPageActionTypes.DELETE_EDITING_LOCATION] = (uuid) =>
            this.deleteEntity(uuid, Topics.LOCATIONS);
    }

    addRTablesHandlers(handlers) {
        handlers[DataActionTypes.LOAD_RESTAURANT_TABLES] = (tables) =>
            this.replaceEntities(tables, RestaurantTable.create, Topics.RESTAURANT_TABLES, EntitiesUtils.nameComparator);
        handlers[TablesPageActions.CREATE_R_TABLE] = (table) =>
            this.createEntity(table, RestaurantTable.create, Topics.RESTAURANT_TABLES, EntitiesUtils.nameComparator);
        handlers[TablesPageActions.UPDATE_R_TABLE] = (table) =>
            this.updateEntity(table, RestaurantTable.create, Topics.RESTAURANT_TABLES, EntitiesUtils.nameComparator);
        handlers[TablesPageActions.DELETE_EDITING_R_TABLE] = (uuid) =>
            this.deleteEntity(uuid, Topics.RESTAURANT_TABLES);
    }

    addWaitersHandlers(handlers) {
        handlers[DataActionTypes.LOAD_WAITER_STATUSES] = (statuses) =>
            this.receiveWaiterStatuses(statuses);

        handlers[DataActionTypes.LOAD_WAITERS] = (waiters) =>
            this.replaceEntities(waiters, Waiter.create, Topics.WAITERS, EntitiesUtils.nameComparator);
        handlers[WaitersPageActions.CREATE_WAITER] = (waiter) =>
            this.createEntity(waiter, Waiter.create, Topics.WAITERS, EntitiesUtils.nameComparator);
        handlers[WaitersPageActions.UPDATE_EDITING_WAITER] = (waiter) =>
            this.updateEntity(waiter, Waiter.create, Topics.WAITERS, EntitiesUtils.nameComparator);
        handlers[WaitersPageActions.DELETE_EDITING_WAITER] = (uuid) =>
            this.deleteEntity(uuid, Topics.WAITERS);
    }
}

const dataStore = new DataStore();
export default dataStore;
