import requestBuilder from "../../actions/RequestBuilder";
import {
    ACT_ABORT_CREATE_ORDINATION, ACT_BEGIN_CREATE_ORDINATION,
    ACT_CREATE_ORDINATION
} from "../../actions/ActionTypes";
import dispatcher from "../../dispatcher/SimpleDispatcher";

class OrdinationsCreatorActions {

    beginOrdinationCreation(){
        dispatcher.fireEnd(ACT_BEGIN_CREATE_ORDINATION);
    }

    abortOrdinationCreation(){
        dispatcher.fireEnd(ACT_ABORT_CREATE_ORDINATION);
    }

    createOrdination(table, dishes){
        requestBuilder.post(ACT_CREATE_ORDINATION, 'dining-tables/' + table + '/ordinations', dishes);
    }

}

const ordinationsCreatorActions = new OrdinationsCreatorActions();

export default ordinationsCreatorActions;