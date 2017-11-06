import requestBuilder from "../../actions/RequestBuilder";
import {ACT_BEGIN_CREATE_ORDINATION, ACT_CREATE_ORDINATION} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class OrdinationsCreatorActions {

    beginOrdinationCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ORDINATION);
    }

    createOrdination(orders){
        requestBuilder.post(ACT_CREATE_ORDINATION, 'ordinations', orders);
    }

}

const ordinationsCreatorActions = new OrdinationsCreatorActions();

export default ordinationsCreatorActions;