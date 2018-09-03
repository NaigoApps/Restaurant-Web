import additionsActions from "../../generic/AdditionsActions";
import {ApplicationActions} from "../../actions/ApplicationActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

class AdditionsPageActions {

    initAdditionsPage(){
        additionsActions.retrieveAdditions();
        SettingsPageActions.loadSettings();
    }
}

const additionsPageActions = new AdditionsPageActions();
export default additionsPageActions;