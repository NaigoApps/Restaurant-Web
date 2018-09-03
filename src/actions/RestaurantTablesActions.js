import {ACT_RETRIEVE_RESTAURANT_TABLES} from "./DataActions";
import asyncActionBuilder from "./RequestBuilder";

class RestaurantTablesActions {
    retrieveAvailableTables() {
        asyncActionBuilder.get(ACT_RETRIEVE_RESTAURANT_TABLES, 'restaurant-tables');
    }
}

const restaurantTablesActions = new RestaurantTablesActions();
export default restaurantTablesActions;