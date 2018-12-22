import {DataActions} from "../../actions/DataActions";
import {SettingsPageActions} from "../settings/SettingsPageActions";

class EveningPageActions {

    initEveningPage() {
        DataActions.loadDiningTables();

        DataActions.loadWaiters();
        DataActions.loadPhases();
        DataActions.loadAdditions();
        DataActions.loadCustomers();
        DataActions.loadRestaurantTables();
        DataActions.loadDishes();
        DataActions.loadCategories();

        SettingsPageActions.loadSettings();
    }

}

const eveningPageActions = new EveningPageActions();
export default eveningPageActions;