import asyncActionBuilder from "./RequestBuilder";
import ActionsFactory from "../utils/ActionsFactory";

export class DataActionTypes {
    static LOAD_PRINTER_SERVICES = "LOAD_PRINTER_SERVICES";
    static LOAD_PRINTERS = "LOAD_PRINTERS";
    static LOAD_LOCATIONS = "LOAD_LOCATIONS";
    static LOAD_PHASES = "LOAD_PHASES";
    static LOAD_WAITERS = "LOAD_WAITERS";
    static LOAD_WAITER_STATUSES = "LOAD_WAITER_STATUSES";
    static LOAD_CUSTOMERS = "LOAD_CUSTOMERS";
    static LOAD_RESTAURANT_TABLES = "LOAD_RESTAURANT_TABLES";
    static LOAD_CATEGORIES = "LOAD_CATEGORIES";
    static LOAD_ADDITIONS = "LOAD_ADDITIONS";
    static LOAD_DISHES = "LOAD_DISHES";
    static LOAD_DISH_STATUSES = "LOAD_DISH_STATUSES";

    static LOAD_DINING_TABLES = ActionsFactory.next();
    static LOAD_ORDINATIONS = ActionsFactory.next();
    static LOAD_ORDERS = ActionsFactory.next();
    static LOAD_BILLS = ActionsFactory.next();
}

export class DataActions {
    static loadPrinterServices(){
        asyncActionBuilder.get(DataActionTypes.LOAD_PRINTER_SERVICES, 'printers/services');
    }
    static loadPrinters(){
        asyncActionBuilder.get(DataActionTypes.LOAD_PRINTERS, 'printers/printers');
    }

    static loadLocations(){
        asyncActionBuilder.get(DataActionTypes.LOAD_LOCATIONS, 'locations');
    }

    static loadRestaurantTables(){
        asyncActionBuilder.get(DataActionTypes.LOAD_RESTAURANT_TABLES, 'restaurant-tables');
    }

    static loadWaiters(){
        asyncActionBuilder.get(DataActionTypes.LOAD_WAITERS, 'waiters');
    }

    static loadWaiterStatuses(){
        asyncActionBuilder.get(DataActionTypes.LOAD_WAITER_STATUSES, 'waiter-statuses');
    }

    static loadCategories(){
        asyncActionBuilder.get(DataActionTypes.LOAD_CATEGORIES, 'categories');
    }

    static loadAdditions(){
        asyncActionBuilder.get(DataActionTypes.LOAD_ADDITIONS, 'additions');
    }

    static loadDishes(){
        asyncActionBuilder.get(DataActionTypes.LOAD_DISHES, 'dishes/all');
    }

    static loadCustomers(){
        asyncActionBuilder.get(DataActionTypes.LOAD_CUSTOMERS, 'customers');
    }

    static loadDishStatuses(){
        asyncActionBuilder.get(DataActionTypes.LOAD_DISH_STATUSES, 'dishes-statuses');
    }

    static loadPhases(){
        asyncActionBuilder.get(DataActionTypes.LOAD_PHASES, 'phases');
    }

    static loadDiningTables(){
        asyncActionBuilder.get(DataActionTypes.LOAD_DINING_TABLES, 'dining-tables');
    }

    static loadOrdinations(table){
        let resource = 'ordinations';
        if(table){
            resource += '/' + table.uuid
        }
        asyncActionBuilder.get(DataActionTypes.LOAD_ORDINATIONS, resource);
    }

    static loadBills(table){
        let resource = 'bills';
        if(table){
            resource += '/' + table.uuid
        }
        asyncActionBuilder.get(DataActionTypes.LOAD_BILLS, resource);
    }
}


//DiningTables
export const ACT_DELETE_ORDINATION = "ACT_DELETE_ORDINATION";
export const ACT_UPDATE_ORDINATION = "ACT_UPDATE_ORDINATION";

export const ACT_REMOVE_FAILED_ACTION = "ACT_REMOVE_FAILED_ACTION";