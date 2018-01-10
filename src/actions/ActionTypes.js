//Application
export const ACT_TOGGLE_FULL_SCREEN = "ACT_TOGGLE_FULL_SCREEN";
export const ACT_REQUEST_FULL_SCREEN = "ACT_REQUEST_FULL_SCREEN";
export const ACT_DISMISS_FULL_SCREEN = "ACT_DISMISS_FULL_SCREEN";

export const ACT_RETRIEVE_WAITER_STATUSES = "ACT_RETRIEVE_WAITER_STATUSES";
export const ACT_RETRIEVE_DISH_STATUSES = "ACT_RETRIEVE_DISH_STATUSES";

//Tables
export const ACT_RETRIEVE_RESTAURANT_TABLES = "ACT_RETRIEVE_RESTAURANT_TABLES";
export const ACT_CREATE_RESTAURANT_TABLE = "ACT_CREATE_RESTAURANT_TABLE";
export const ACT_UPDATE_RESTAURANT_TABLE = "ACT_UPDATE_RESTAURANT_TABLE";
export const ACT_DELETE_RESTAURANT_TABLE = "ACT_DELETE_RESTAURANT_TABLE";
export const ACT_SELECT_RESTAURANT_TABLE = "ACT_SELECT_RESTAURANT_TABLE";
export const ACT_DESELECT_RESTAURANT_TABLE = "ACT_DESELECT_RESTAURANT_TABLE";
export const ACT_BEGIN_CREATE_RESTAURANT_TABLE = "ACT_BEGIN_CREATE_RESTAURANT_TABLE";
export const ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME = "ACT_UPDATE_RESTAURANT_TABLE_CREATOR_NAME";


//Waiters
export const ACT_BEGIN_CREATE_WAITER = "ACT_BEGIN_CREATE_WAITER";
export const ACT_CREATE_WAITER = "ACT_CREATE_WAITER";
export const ACT_UPDATE_WAITER = "ACT_UPDATE_WAITER";
export const ACT_DELETE_WAITER = "ACT_DELETE_WAITER";
export const ACT_SELECT_WAITER = "ACT_SELECT_WAITER";
export const ACT_DESELECT_WAITER = "ACT_DESELECT_WAITER";
export const ACT_RETRIEVE_WAITERS = "ACT_RETRIEVE_WAITERS";
//WaiterCreator
export const ACT_UPDATE_WAITER_NAME = "ACT_UPDATE_WAITER_CREATOR_NAME";
export const ACT_UPDATE_WAITER_SURNAME = "ACT_UPDATE_WAITER_CREATOR_SURNAME";
export const ACT_UPDATE_WAITER_CF = "ACT_UPDATE_WAITER_CREATOR_CF";
export const ACT_UPDATE_WAITER_STATUS = "ACT_UPDATE_WAITER_CREATOR_STATUS";

//Additions
export const ACT_RETRIEVE_ADDITIONS = "ACT_RETRIEVE_ADDITIONS";
export const ACT_BEGIN_CREATE_ADDITION = "ACT_BEGIN_CREATE_ADDITION";
export const ACT_CREATE_ADDITION = "ACT_CREATE_ADDITION";
export const ACT_UPDATE_ADDITION_NAME = "ACT_UPDATE_ADDITION_NAME";
export const ACT_UPDATE_ADDITION_PRICE = "ACT_UPDATE_ADDITION_PRICE";
export const ACT_UPDATE_ADDITION_GENERIC = "ACT_UPDATE_ADDITION_GENERIC";
export const ACT_UPDATE_ADDITION = "ACT_UPDATE_ADDITION";
export const ACT_DELETE_ADDITION = "ACT_DELETE_ADDITION";
export const ACT_SELECT_ADDITION = "ACT_SELECT_ADDITION";
export const ACT_DESELECT_ADDITION = "ACT_DESELECT_ADDITION";

//Categories
export const ACT_BEGIN_CREATE_CATEGORY = "ACT_BEGIN_CREATE_CATEGORY";
export const ACT_CREATE_CATEGORY = "ACT_CREATE_CATEGORY";
export const ACT_DELETE_CATEGORY = "ACT_DELETE_CATEGORY";
export const ACT_UPDATE_CATEGORY = "ACT_UPDATE_CATEGORY";
export const ACT_SELECT_CATEGORY = "ACT_SELECT_CATEGORY";
export const ACT_DESELECT_CATEGORY = "ACT_DESELECT_CATEGORY";
export const ACT_RETRIEVE_CATEGORIES = "ACT_RETRIEVE_CATEGORIES";
export const ACT_RETRIEVE_CURRENT_MENU = "ACT_RETRIEVE_CURRENT_MENU";
//CategoryCreator
export const ACT_UPDATE_CATEGORY_CREATOR_NAME = "ACT_UPDATE_CATEGORY_CREATOR_NAME";
export const ACT_UPDATE_CATEGORY_CREATOR_LOCATION = "ACT_UPDATE_CATEGORY_CREATOR_LOCATION";

//Dishes
export const ACT_BEGIN_CREATE_DISH = "ACT_BEGIN_CREATE_DISH";
export const ACT_CREATE_DISH = "ACT_CREATE_DISH";
export const ACT_UPDATE_DISH = "ACT_UPDATE_DISH";
export const ACT_SELECT_DISH = "ACT_SELECT_DISH";
export const ACT_DESELECT_DISH = "ACT_DESELECT_DISH";
export const ACT_DELETE_DISH = "ACT_DELETE_DISH";
export const ACT_RETRIEVE_DISHES = "ACT_RETRIEVE_DISHES";
//DishCreator
export const ACT_UPDATE_DISH_CREATOR_NAME = "ACT_UPDATE_DISH_CREATOR_NAME";
export const ACT_UPDATE_DISH_CREATOR_DESCRIPTION = "ACT_UPDATE_DISH_CREATOR_DESCRIPTION";
export const ACT_UPDATE_DISH_CREATOR_PRICE = "ACT_UPDATE_DISH_CREATOR_PRICE";

//Phases
export const ACT_RETRIEVE_PHASES = "ACT_RETRIEVE_PHASES";

//Evening
export const ACT_UPDATE_EVENING_DATE = "ACT_UPDATE_EVENING_DATE";
export const ACT_UPDATE_EVENING_COVER_CHARGE = "ACT_UPDATE_EVENING_COVER_CHARGE";
export const ACT_SELECT_EVENING = "ACT_SELECT_EVENING";
export const ACT_DESELECT_EVENING = "ACT_DESELECT_EVENING";
export const ACT_ASK_SELECTED_EVENING = "ACT_ASK_SELECTED_EVENING";
export const ACT_UPDATE_EVENING = "ACT_UPDATE_EVENING";
//DiningTables
export const ACT_BEGIN_CREATE_DINING_TABLE = "ACT_BEGIN_CREATE_DINING_TABLE";
export const ACT_SELECT_DINING_TABLE = "ACT_SELECT_DINING_TABLE";
export const ACT_DESELECT_DINING_TABLE = "ACT_DESELECT_DINING_TABLE";
export const ACT_CREATE_DINING_TABLE = "ACT_CREATE_DINING_TABLE";
export const ACT_UPDATE_DINING_TABLE = "ACT_UPDATE_DINING_TABLE";
export const ACT_DELETE_DINING_TABLE = "ACT_DELETE_DINING_TABLE";
export const ACT_UPDATE_DINING_TABLE_CREATOR_WAITER = "ACT_UPDATE_DINING_TABLE_CREATOR_WAITER";
export const ACT_UPDATE_DINING_TABLE_CREATOR_TABLE = "ACT_UPDATE_DINING_TABLE_CREATOR_TABLE";
export const ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES = "ACT_UPDATE_DINING_TABLE_CREATOR_COVER_CHARGES";
export const ACT_PRINT_PARTIAL_BILL = "ACT_PRINT_PARTIAL_BILL";

export const ACT_BEGIN_DINING_TABLE_CLOSING = "ACT_BEGIN_DINING_TABLE_CLOSING";
export const ACT_CLOSE_ORDERS = "ACT_CLOSE_ORDERS";
export const ACT_OPEN_ORDERS = "ACT_OPEN_ORDERS";
export const ACT_ABORT_DINING_TABLE_CLOSING = "ACT_ABORT_DINING_TABLE_CLOSING";

//Ordinations
export const ACT_SELECT_ORDINATION = "ACT_SELECT_ORDINATION";
export const ACT_DESELECT_ORDINATION = "ACT_DESELECT_ORDINATION";
export const ACT_CREATE_ORDINATION = "ACT_CREATE_ORDINATION";
export const ACT_BEGIN_CREATE_ORDINATION = "ACT_BEGIN_CREATE_ORDINATION";
export const ACT_ABORT_CREATE_ORDINATION = "ACT_ABORT_CREATE_ORDINATION";
export const ACT_BEGIN_EDIT_ORDINATION = "ACT_BEGIN_EDIT_ORDINATION";
export const ACT_ABORT_EDIT_ORDINATION = "ACT_ABORT_EDIT_ORDINATION";
export const ACT_DELETE_ORDINATION = "ACT_DELETE_ORDINATION";
export const ACT_PRINT_ORDINATION = "ACT_PRINT_ORDINATION";
export const ACT_EDIT_ORDINATION = "ACT_EDIT_ORDINATION";

//Orders
export const ACT_BEGIN_CREATE_ORDER = "ACT_BEGIN_CREATE_ORDER";
export const ACT_UPDATE_ORDER_DISH = "ACT_UPDATE_ORDER_DISH";
export const ACT_UPDATE_ORDER_PRICE = "ACT_UPDATE_ORDER_PRICE";
export const ACT_UPDATE_ORDER_PHASE = "ACT_UPDATE_ORDER_PHASE";
export const ACT_UPDATE_ORDER_DESCRIPTION = "ACT_UPDATE_ORDER_DESCRIPTION";
export const ACT_CREATE_ORDER = "ACT_CREATE_ORDER";
export const ACT_UPDATE_ORDER = "ACT_UPDATE_ORDER";
export const ACT_SELECT_ORDER = "ACT_SELECT_ORDER";
export const ACT_DESELECT_ORDER = "ACT_DESELECT_ORDER";
export const ACT_DELETE_ORDER = "ACT_DELETE_ORDER";

//Printers
export const ACT_RETRIEVE_PRINTERS = "ACT_RETRIEVE_PRINTERS";
export const ACT_RETRIEVE_PRINTER_SERVICES = "ACT_RETRIEVE_PRINTER_SERVICES";
export const ACT_CREATE_PRINTER = "ACT_CREATE_PRINTER";
export const ACT_UPDATE_PRINTER = "ACT_UPDATE_PRINTER";
export const ACT_DELETE_PRINTER = "ACT_DELETE_PRINTER";
export const ACT_SELECT_PRINTER = "ACT_SELECT_PRINTER";
export const ACT_DESELECT_PRINTER = "ACT_DESELECT_PRINTER";
export const ACT_BEGIN_CREATE_PRINTER = "ACT_BEGIN_CREATE_PRINTER";
export const ACT_UPDATE_PRINTER_NAME = "ACT_UPDATE_PRINTER_NAME";
export const ACT_UPDATE_PRINTER_MAIN = "ACT_UPDATE_PRINTER_MAIN";
export const ACT_UPDATE_PRINTER_LINE_CHARACTERS = "ACT_UPDATE_PRINTER_LINE_CHARACTERS";

//Locations
export const ACT_RETRIEVE_LOCATIONS = "ACT_RETRIEVE_LOCATIONS";
export const ACT_RETRIEVE_LOCATION_SERVICES = "ACT_RETRIEVE_LOCATION_SERVICES";
export const ACT_CREATE_LOCATION = "ACT_CREATE_LOCATION";
export const ACT_UPDATE_LOCATION = "ACT_UPDATE_LOCATION";
export const ACT_DELETE_LOCATION = "ACT_DELETE_LOCATION";
export const ACT_SELECT_LOCATION = "ACT_SELECT_LOCATION";
export const ACT_DESELECT_LOCATION = "ACT_DESELECT_LOCATION";
export const ACT_BEGIN_CREATE_LOCATION = "ACT_BEGIN_CREATE_LOCATION";
export const ACT_UPDATE_LOCATION_NAME = "ACT_UPDATE_LOCATION_NAME";
export const ACT_UPDATE_LOCATION_PRINTER = "ACT_UPDATE_LOCATION_PRINTER";


//FailedStore
export const ACT_REMOVE_FAILED_ACTION = "ACT_REMOVE_FAILED_ACTION";

export const ACT_CLEAR_ERROR_MESSAGES = "ACT_CLEAR_ERROR_MESSAGES";