import asyncActionBuilder from "./RequestBuilder";

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

    static loadOrdinations(){
        asyncActionBuilder.get(DataActionTypes.LOAD_ORDINATIONS, 'ordinations');
    }

    static loadOrders(){
        asyncActionBuilder.get(DataActionTypes.LOAD_ORDERS, 'orders');
    }

    static loadBills(){
        asyncActionBuilder.get(DataActionTypes.LOAD_BILLS, 'bills');
    }
}


//DiningTables
export const ACT_DELETE_ORDINATION = "ACT_DELETE_ORDINATION";
export const ACT_UPDATE_ORDINATION = "ACT_UPDATE_ORDINATION";

export const ACT_REMOVE_FAILED_ACTION = "ACT_REMOVE_FAILED_ACTION";