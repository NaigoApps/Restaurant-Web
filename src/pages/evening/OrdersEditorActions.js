import requestBuilder from "../../actions/RequestBuilder";
import {ACT_DELETE_ORDER, ACT_SELECT_ORDER, ACT_UPDATE_ORDER} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class OrdersEditorActions {

    updateOrderDish(uuid, dish) {
        requestBuilder.put(ACT_UPDATE_ORDER, 'orders/' + uuid + '/dish', dish);
    }

    updateOrderPrice(uuid, price){
        requestBuilder.put(ACT_UPDATE_ORDER, 'orders/' + uuid + '/price', price);
    }

    updateOrderNotes(uuid, notes){
        requestBuilder.put(ACT_UPDATE_ORDER, 'orders/' + uuid + '/notes', notes);
    }

    updateOrderPhase(uuid, phase){
        requestBuilder.put(ACT_UPDATE_ORDER, 'orders/' + uuid + '/phase', phase);
    }

    selectOrder(order){
        dispatcher.fireEnd(ACT_SELECT_ORDER, order);
    }

    deselectOrder(order){
        dispatcher.fireEnd(ACT_SELECT_ORDER, null);
    }

    deleteOrder(uuid) {
        requestBuilder.remove(ACT_DELETE_ORDER, 'orders', uuid);
    }

}

const ordersEditorActions = new OrdersEditorActions();

export default ordersEditorActions;