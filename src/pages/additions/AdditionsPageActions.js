import additionsActions from "../../generic/AdditionsActions";
import {ApplicationActions} from "../../actions/ApplicationActions";

class AdditionsPageActions {

    initAdditionsPage(){
        additionsActions.retrieveAdditions();
        ApplicationActions.loadSettings();
    }
}

const additionsPageActions = new AdditionsPageActions();
export default additionsPageActions;