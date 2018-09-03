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

    static loadDishStatuses(){
        asyncActionBuilder.get(DataActionTypes.LOAD_DISH_STATUSES, 'dishes-statuses');
    }
}


//DiningTables

export const ACT_BEGIN_DINING_TABLE_DATA_EDITING = "ACT_BEGIN_DINING_TABLE_DATA_EDITING";
export const ACT_ABORT_DINING_TABLE_DATA_EDITING = "ACT_ABORT_DINING_TABLE_DATA_EDITING";

export const ACT_BEGIN_DINING_TABLE_BILLS_EDITING = "ACT_BEGIN_DINING_TABLE_BILLS_EDITING";
export const ACT_ABORT_DINING_TABLE_BILLS_EDITING = "ACT_ABORT_DINING_TABLE_BILLS_EDITING";

export const ACT_DELETE_DINING_TABLE = "ACT_DELETE_DINING_TABLE";


export const ACT_SELECT_BILL = "ACT_SELECT_BILL";
export const ACT_DESELECT_BILL = "ACT_DESELECT_BILL";
export const ACT_DELETE_BILL = "ACT_DELETE_BILL";

//Ordinations
export const ACT_CREATE_ORDINATION = "ACT_CREATE_ORDINATION";
export const ACT_DELETE_ORDINATION = "ACT_DELETE_ORDINATION";
export const ACT_UPDATE_ORDINATION = "ACT_UPDATE_ORDINATION";


//Printers

//PAGE
export const ACT_PRINTERS_PAGE_SELECT_PAGE = "ACT_PRINTERS_PAGE_SELECT_PAGE";

//CREATOR


//Locations


//FailedStore
export const ACT_REMOVE_FAILED_ACTION = "ACT_REMOVE_FAILED_ACTION";

export const ACT_CLEAR_ERROR_MESSAGES = "ACT_CLEAR_ERROR_MESSAGES";

//Inputs
export const ACT_FLOAT_INPUT_DIGIT = "ACT_FLOAT_INPUT_DIGIT";
export const ACT_OPEN_EDITOR = "ACT_OPEN_EDITOR";
export const ACT_CLOSE_EDITOR = "ACT_CLOSE_EDITOR";