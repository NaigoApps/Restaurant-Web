import asyncActionBuilder from "../actions/RequestBuilder";
import {DataActionTypes} from "../actions/DataActions";

class AdditionsActions {

    retrieveAdditions() {
        asyncActionBuilder.get(DataActionTypes.LOAD_ADDITIONS, "additions");
    }
}

const additionsActions = new AdditionsActions();
export default additionsActions;