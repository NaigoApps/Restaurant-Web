import requestBuilder from "../../actions/RequestBuilder";
import {ACT_RETRIEVE_ORDINATIONS} from "../../actions/ActionTypes";

class OrdinationsActions {

    retrieveOrdinations(){
        requestBuilder.get(ACT_RETRIEVE_ORDINATIONS, 'ordinations');
    }

}

const ordinationsActions = new OrdinationsActions();

export default ordinationsActions;