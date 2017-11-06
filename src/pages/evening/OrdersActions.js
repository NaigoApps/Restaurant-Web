import requestBuilder from "../../actions/RequestBuilder";
import {ACT_RETRIEVE_ORDERS} from "../../actions/ActionTypes";

class OrdersActions {

    retrieveOrders(){
        requestBuilder.get(ACT_RETRIEVE_ORDERS, "orders");
    }
}

const ordersActions = new OrdersActions();

export default ordersActions;