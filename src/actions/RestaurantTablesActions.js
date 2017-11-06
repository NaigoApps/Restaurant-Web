import {ACT_RETRIEVE_RESTAURANT_TABLES} from "./ActionTypes";
import asyncActionBuilder from "./RequestBuilder";

class RestaurantTablesActions {
    retrieveAvailableTables() {
        asyncActionBuilder.get(ACT_RETRIEVE_RESTAURANT_TABLES, 'restaurant-tables');
    }
}

const restaurantTablesActions = new RestaurantTablesActions();
export default restaurantTablesActions;