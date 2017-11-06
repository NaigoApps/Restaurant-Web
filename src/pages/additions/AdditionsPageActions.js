import additionsActions from "../../generic/AdditionsActions";

class AdditionsPageActions {

    initAdditionsPage(){
        additionsActions.retrieveAdditions();
    }
}

const additionsPageActions = new AdditionsPageActions();
export default additionsPageActions;