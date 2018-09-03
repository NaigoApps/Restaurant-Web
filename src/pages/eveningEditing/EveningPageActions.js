import waitersActions from "../../generic/WaitersActions";
import phasesActions from "../../actions/PhasesActions";
import additionsActions from "../../generic/AdditionsActions";
import customersPageActions from "../customers/CustomersPageActions";
import asyncActionBuilder from "../../actions/RequestBuilder";
import {EveningEditingActionTypes} from "./EveningEditorActions";
import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

class EveningPageActions {

    initEveningPage(){
        this.retrieveSelectedEvening();

        waitersActions.retrieveWaiters();
        phasesActions.retrievePhases();
        additionsActions.retrieveAdditions();
        DataActions.loadRestaurantTables();
        customersPageActions.initCustomersPage();

        DataActions.loadDishes();
        DataActions.loadCategories();
        SettingsPageActions.loadSettings();
    }

    retrieveSelectedEvening() {
        asyncActionBuilder.get(EveningEditingActionTypes.GET_SELECTED, 'evenings/selected');
    }
}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;