import {ACT_BEGIN_CREATE_ORDER} from "../../../../actions/ActionTypes";
import dispatcher from "../../../../dispatcher/SimpleDispatcher";

class OrdersCreatorActions {

    beginOrderCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ORDER);waipag
    }

}

const ordersCreatorActions = new OrdersCreatorActions();

export default ordersCreatorActions;