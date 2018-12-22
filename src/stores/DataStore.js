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
import {ApplicationActionTypes} from "../actions/ApplicationActions";
import {Pages} from "../App";
import Ordination from "../model/Ordination";
import OrdinationsEditorActions
    from "../pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdinationsEditorActions";
import OrdersEditorActions from "../pages/eveningEditing/diningTableEditing/ordinationsEditing/OrdersEditorActions";
import Order from "../model/Order";
import DiningTablesClosingActions
    from "../pages/eveningEditing/diningTableEditing/tableClosingFeature/DiningTablesClosingActions";
import Bill from "../model/Bill";

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
    BILLS: "bills"
};

class DataStore extends AbstractStore {
    constructor() {
        super("data", EVT);
        this.status = STATUSES.NOT_LOADED;
        this.pool = {};
        this.backups = {};
        this.topics = {};
        Object.keys(Topics).forEach(topic => {
            this.topics[Topics[topic]] = [];
        });
    }

    clearData() {
        this.pool = {};
        this.backups = {};
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
        this.addOrdinationsHandlers(handlers);
        this.addOrdersHandlers(handlers);
        this.addBillsHandlers(handlers);
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
            if (page === Pages.EVENING_SELECTION) {
                this.clearTopic(Topics.EVENINGS);
            }
        };

        DataStore.assign(handlers, [
                EveningSelectorActions.CHOOSE,
                EveningEditorActions.GET_SELECTED,
                EveningEditorActions.CONFIRM_COVER_CHARGE_EDITING],
            (evening) => this.replaceEntities([evening], Evening.create, Topics.EVENINGS));

    }

    addDiningTablesHandlers(handlers) {
        handlers[DataActionTypes.LOAD_DINING_TABLES] = tables => {
            this.replaceEntities(tables, DiningTable.create, Topics.DINING_TABLES, EntitiesUtils.defaultComparator("openingTime"))
        };

        handlers[EveningEditorActions.DESELECT_EVENING] = () => {
            this.clearTopic(Topics.EVENINGS);
            this.clearTopic(Topics.DINING_TABLES);
            this.clearTopic(Topics.ORDINATIONS);
            this.clearTopic(Topics.ORDERS);
            this.clearTopic(Topics.BILLS);
        };

        handlers[DiningTablesEditorActions.CRUD.DESELECT] = () => {
            this.clearTopic(Topics.ORDINATIONS);
            this.clearTopic(Topics.ORDERS);
            this.clearTopic(Topics.BILLS);
        };

        handlers[DiningTablesEditorActions.CRUD.DELETE] = (evening) => {
            this.updateEntity(evening, Evening.create, Topics.EVENINGS);
            this.clearTopic(Topics.ORDINATIONS);
            this.clearTopic(Topics.ORDERS);
            this.clearTopic(Topics.BILLS);
        };

        handlers[DiningTablesEditorActions.CRUD.CREATE] = (table) => {
            this.createEntity(table, DiningTable.create, Topics.DINING_TABLES);
        };

        DataStore.assign(handlers, [
            DiningTablesEditorActions.CRUD.UPDATE.REMOTE.CCS,
            DiningTablesEditorActions.CRUD.UPDATE.REMOTE.WAITER,
            DiningTablesEditorActions.CRUD.UPDATE.REMOTE.TABLE
        ], (table) => this.updateEntity(table, DiningTable.create, Topics.DINING_TABLES));

        handlers[DiningTablesClosingActions.LOCK_TABLE] = (table) => {
            this.deleteEntity(table.uuid, Topics.DINING_TABLES);
            this.clearTopic(Topics.ORDINATIONS);
            this.clearTopic(Topics.ORDERS);
            this.clearTopic(Topics.BILLS);
        };

        handlers[OrdinationsEditorActions.CRUD.DELETE] = (table) => {
            this.updateEntity(table, DiningTable.create, Topics.DINING_TABLES);
        };
    }

    addOrdinationsHandlers(handlers) {
        handlers[DataActionTypes.LOAD_ORDINATIONS] = ordinations => {
            this.replaceEntities(ordinations, Ordination.create, Topics.ORDINATIONS, EntitiesUtils.defaultComparator("creationTime"));
            this.clearTopic(Topics.ORDERS);
            ordinations.forEach(ordination => {
                ordination.orders.forEach(order => {
                    this.createEntity(order, Order.create, Topics.ORDERS);
                });
            });
        };

        handlers[OrdinationsEditorActions.CRUD.BEGIN_CREATION] = (dto) => {
            this.createEntity(dto, Ordination.create, Topics.ORDINATIONS);
        };
        handlers[OrdinationsEditorActions.CRUD.ABORT_CREATION] = (ordination) => {
            ordination.orders.forEach(order => this.deleteEntity(order.uuid, Topics.ORDERS));
            ordination.table = null;
            this.deleteEntity(ordination.uuid, Topics.ORDINATIONS);
        };

        handlers[OrdinationsEditorActions.CRUD.CREATE] = (newDto, oldDto) => {
            const oldOrdination = this.getEntity(oldDto.uuid);
            const orders = oldOrdination.orders.slice();
            orders.forEach(order => {
                order.newDto = null;
                order.bill = null;
                this.deleteEntity(order.uuid, Topics.ORDERS)
            });
            oldOrdination.table = null;
            this.deleteEntity(oldOrdination.uuid, Topics.ORDINATIONS);

            this.createEntity(newDto, Ordination.create, Topics.ORDINATIONS);
            newDto.orders.forEach(order => {
                this.createEntity(order, Order.create, Topics.ORDERS);
            });
        };

        handlers[DiningTablesEditorActions.MERGE.CONFIRM] = (merged, old) => {
            this.clearTopic(Topics.ORDINATIONS);
            this.clearTopic(Topics.ORDERS);
            this.clearTopic(Topics.BILLS);
            this.deleteEntity(old.uuid, Topics.DINING_TABLES);

            this.createEntity(merged, DiningTable.create, Topics.DINING_TABLES);
        };

        handlers[OrdinationsEditorActions.CRUD.SELECT] = (ordination) => {
            this.backups[ordination.uuid] = ordination.toDto();
            const orders = ordination.orders;
            for (let i = 0; i < orders.length; i++) {
                this.backups[orders[i].uuid] = orders[i].toDto();
            }
        };

        handlers[OrdinationsEditorActions.CRUD.DESELECT] = (ordination) => {
            const ordersToRemove = ordination.orders;
            ordersToRemove.forEach(order => {
                order.ordination = null;
                order.bill = null;
                this.deleteEntity(order.uuid, Topics.ORDERS);
            });
            const newOrdination = this.updateEntity(this.backups[ordination.uuid], Ordination.create, Topics.ORDINATIONS);
            delete this.backups[ordination.uuid];
            newOrdination._orders.forEach(uuid => {
                this.createEntity(this.backups[uuid], Order.create, Topics.ORDERS);
                delete this.backups[uuid];
            });
        };

        handlers[OrdinationsEditorActions.WIZARD.SELECT_DISH] = (data) => {
            const dish = data.dish;
            const quantity = data.quantity;
            const ordination = data.ordination;
            const phase = data.phase;
            for (let i = 0; i < quantity; i++) {
                this.createEntity(EntitiesUtils.newOrder(dish, phase, ordination), Order.create, Topics.ORDERS);
            }
        };

        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.QUANTITY.MORE] = (dtos) => {
            for (let i = 0; i < dtos.length; i++) {
                this.createEntity(dtos[i], Order.create, Topics.ORDERS);
            }
        };

        handlers[OrdersEditorActions.CRUD.UPDATE.LOCAL.QUANTITY.LESS] = (orders) => {
            for (let i = 0; i < orders.length; i++) {
                orders[i].ordination = null;
                orders[i].bill = null;
                this.deleteEntity(orders[i].uuid, Topics.ORDERS);
            }
        };

        handlers[OrdinationsEditorActions.CRUD.UPDATE] = (ordination) => {
            this.updateEntity(ordination, Ordination.create, Topics.ORDINATIONS);
            ordination.orders.forEach(order => {
                this.createEntity(order, Order.create, Topics.ORDERS);
            });
        };

        handlers[OrdinationsEditorActions.PRINT_ORDINATION] = (ordination) => {
            this.updateEntity(ordination, Ordination.create, Topics.ORDINATIONS);
        };

        // handlers[OrdersEditorActions.CRUD.UPDATE.REMOTE.PRICE] = ordination => {
        //     this.updateEntity(ordination, Ordination.create, Topics.ORDINATIONS);
        // };

        // handlers[OrdersEditorActions.CRUD.DELETE] = (ordination) => {
        //     if(ordination.orders.length === 0){
        //         const oldOrdination = this.getEntity(ordination.uuid);
        //         oldOrdination.table = null;
        //         this.deleteEntity(ordination.uuid, Topics.ORDINATIONS);
        //     }else {
        //         this.updateEntity(ordination, Ordination.create, Topics.ORDINATIONS);
        //     }
        // };
    }

    addOrdersHandlers(handlers) {
        handlers[OrdersEditorActions.CRUD.UPDATE.REMOTE.PRICE] = (ordination) => {
            this.updateEntity(ordination, Ordination.create, Topics.ORDINATIONS);
            ordination.orders.forEach(order => {
                this.updateEntity(order, Order.create, Topics.ORDERS);
            });
        };
    }

    addBillsHandlers(handlers) {
        handlers[DataActionTypes.LOAD_BILLS] = bills => {
            this.replaceEntities(bills, Bill.create, Topics.BILLS);
        };

        handlers[DiningTablesClosingActions.CRUD.BEGIN_CREATION] = (dto) => {
            this.createEntity(dto, Bill.create, Topics.BILLS);
        };

        handlers[DiningTablesClosingActions.CRUD.ABORT_CREATION] = (bill) => {
            const orders = bill.orders;
            orders.forEach(order => order.bill = null);
            bill.table = null;
            this.deleteEntity(bill, Topics.BILLS);
        };

        handlers[DiningTablesClosingActions.CRUD.CREATE] = (newDto, oldDto) => {
            const originalBill = this.getEntity(oldDto.uuid);
            originalBill.table = null;
            this.deleteEntity(originalBill.uuid, Topics.BILLS);

            this.createEntity(newDto, Bill.create, Topics.BILLS);
        };

        handlers[DiningTablesClosingActions.QUICK_BILL] = (dto) => {
            this.createEntity(dto, Bill.create, Topics.BILLS);
        };

        handlers[DiningTablesClosingActions.CRUD.DELETE] = (billUuid) => {
            const bill = this.getEntity(billUuid);
            bill.table = null;
            this.deleteEntity(billUuid, Topics.BILLS);
        };

        handlers[DiningTablesClosingActions.PRINT_BILL] = (bill) => {
            this.updateEntity(bill, Bill.create, Topics.BILLS);
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
