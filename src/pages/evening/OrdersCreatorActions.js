import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_BEGIN_CREATE_ORDER,
    ACT_CREATE_ORDER,
    ACT_UPDATE_ORDER_DESCRIPTION,
    ACT_UPDATE_ORDER_DISH,
    ACT_UPDATE_ORDER_PHASE,
    ACT_UPDATE_ORDER_PRICE
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class OrdersCreatorActions {

    beginOrderCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ORDER);waipag
    }

    updateOrderDish(uuid, dish){
        dispatcher.fireEnd(ACT_UPDATE_ORDER_DISH, dish);
    }

    updateOrderPhase(uuid, phase){
        dispatcher.fireEnd(ACT_UPDATE_ORDER_PHASE, phase);
    }

    updateOrderPrice(uuid, price){
        dispatcher.fireEnd(ACT_UPDATE_ORDER_PRICE, price);
    }

    updateOrderNotes(uuid, desc){
        dispatcher.fireEnd(ACT_UPDATE_ORDER_DESCRIPTION, desc);
    }

    createOrder(order){
        requestBuilder.post(ACT_CREATE_ORDER, 'orders', order);
    }

}

const ordersCreatorActions = new OrdersCreatorActions();

export default ordersCreatorActions;